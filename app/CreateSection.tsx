"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Category {
  name: string;
  icon: string;
  apiValue: string;
}

const CATEGORY_ICON_MAP: Record<string, { name: string; icon: string }> = {
  building: { name: "Bangunan", icon: "corporate_fare" },
  cloud: { name: "Awan", icon: "cloud" },
  nature: { name: "Alam", icon: "nature" },
  vehicle: { name: "Kendaraan", icon: "directions_car" },
};

interface MosaicResponse {
  job_id: string;
  status: string;
  error?: string;
}

type AppStatus = "idle" | "pending" | "processing" | "success" | "failed";

const API_BASE_URL = "https://f2a1-103-242-124-24.ngrok-free.app";

const apiFetch = (path: string, init?: RequestInit) =>
  fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "ngrok-skip-browser-warning": "true",
      ...init?.headers,
    },
  });

const CreateSection = () => {
  // --- State Input ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string>("");

  // --- State Proses API ---
  const [status, setStatus] = useState<AppStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultImageUrl, setResultImageUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultUrlRef = useRef<string>("");
  const previewUrlRef = useRef<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError("");
      try {
        const res = await apiFetch("/categories", { method: "GET" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { categories: string[] } = await res.json();

        const mapped: Category[] = data.categories.map((apiValue) => ({
          apiValue,
          name: CATEGORY_ICON_MAP[apiValue]?.name ?? apiValue,
          icon: CATEGORY_ICON_MAP[apiValue]?.icon ?? "category",
        }));

        setCategories(mapped);
        if (mapped.length > 0) setSelectedCategory(mapped[0].apiValue);
      } catch (err: any) {
        setCategoriesError("Gagal memuat kategori.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);

      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;

      setSelectedFile(file);
      setPreviewUrl(url);
      setStatus("idle");
      setResultImageUrl("");
      setErrorMessage("");
    }
  };

  const startPolling = useCallback((jobId: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      try {
        const res = await apiFetch(`/status/${jobId}`);

        if (!res.ok) {
          if (res.status === 404) {
            clearInterval(intervalRef.current!);
            setStatus("failed");
            setErrorMessage("Job tidak ditemukan di server.");
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const contentType = res.headers.get("content-type") ?? "";

        if (contentType.includes("image/")) {
          clearInterval(intervalRef.current!);

          const blob = await res.blob();
          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);

          const imageUrl = URL.createObjectURL(blob);
          resultUrlRef.current = imageUrl;

          setResultImageUrl(imageUrl);
          setStatus("success");
          return;
        }

        const data: MosaicResponse = await res.json();

        if (data.status === "pending") {
          setStatus("pending");
        } else if (data.status === "processing") {
          setStatus("processing");
        } else if (data.status === "failed") {
          clearInterval(intervalRef.current!);
          setStatus("failed");
          setErrorMessage(data.error ?? "Proses mosaik gagal di server.");
        }
      } catch (err: any) {
        clearInterval(intervalRef.current!);
        setStatus("failed");
        setErrorMessage("Koneksi ke server terputus saat polling.");
      }
    }, 3000);
  }, []);

  // Kirim gambar ke API
  const handleGenerate = async () => {
    if (!selectedFile) {
      alert("Silakan upload gambar referensi terlebih dahulu!");
      return;
    }
    if (!selectedCategory) {
      alert("Silakan pilih kategori terlebih dahulu!");
      return;
    }

    setStatus("pending");
    setErrorMessage("");
    setResultImageUrl("");
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = "";
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", selectedCategory);

    try {
      const res = await apiFetch("/mosaic", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error ?? `HTTP ${res.status}`);
      }

      const data: MosaicResponse = await res.json();
      startPolling(data.job_id);
    } catch (err: any) {
      setStatus("failed");
      setErrorMessage(err.message ?? "Terjadi kesalahan sistem.");
    }
  };

  const isProcessing = status === "pending" || status === "processing";

  return (
    <section
      id="create"
      className="relative min-h-dvh z-5 bg-secondary pt-15 lg:pt-20"
    >
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-12 mx-auto max-w-5xl h-full">
        <h1 className="text-4xl font-bold text-gray-700 md:text-5xl lg:text-6xl text-center">
          Buat Mosaikmu!
        </h1>

        <div className="w-full flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          {/* 1. Upload Gambar Referensi */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              1. Upload Gambar Referensi
            </h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/jpg"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-500 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-white hover:bg-gray-50 transition-colors"
            >
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <span className="material-symbols-rounded text-5xl block">
                    cloud_upload
                  </span>
                  <p>Klik untuk Pilih Gambar</p>
                  <p className="text-xs mt-1">Format: JPG, PNG</p>
                </div>
              )}
            </div>
          </div>

          {/* 2. Hasil / Status */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Hasil Photomosaic
            </h2>
            <div className="border-2 border-dashed border-gray-500 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative">
              {status === "idle" && (
                <p className="text-gray-400">Hasil akan muncul di sini</p>
              )}

              {isProcessing && (
                <div className="text-center px-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3" />
                  <p className="font-medium text-gray-700 capitalize">
                    Status:{" "}
                    {status === "pending"
                      ? "Menunggu antrian..."
                      : "Memproses..."}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Jangan tutup halaman ini, server sedang menyusun gambar.
                  </p>
                </div>
              )}

              {status === "failed" && (
                <div className="text-center text-red-500 p-4">
                  <span className="material-symbols-rounded text-5xl">
                    error
                  </span>
                  <p className="text-sm mt-1">{errorMessage}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-xs underline text-red-400"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              {status === "success" && resultImageUrl && (
                <div className="w-full h-full flex flex-col relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultImageUrl}
                    alt="Hasil Mosaik"
                    className="w-full h-full object-contain"
                  />
                  <a
                    href={resultImageUrl}
                    download="mosaic.jpg"
                    className="absolute bottom-3 right-3 bg-primary text-white p-2 rounded-xl text-sm flex items-center gap-1 shadow-md hover:opacity-90"
                  >
                    <span className="material-symbols-rounded text-base">
                      download
                    </span>{" "}
                    Simpan
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pilihan Kategori (dari API) */}
        <div className="w-full mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            2. Pilih Kategori Pengisi Mosaik:
          </h3>

          {categoriesLoading && (
            <p className="text-sm text-gray-400">Memuat kategori...</p>
          )}

          {categoriesError && (
            <p className="text-sm text-red-500">{categoriesError}</p>
          )}

          {!categoriesLoading && !categoriesError && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.apiValue;
                return (
                  <div
                    key={cat.apiValue}
                    onClick={() => setSelectedCategory(cat.apiValue)}
                    className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-blue-50 text-primary scale-105"
                        : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    <span className="material-symbols-rounded text-4xl">
                      {cat.icon}
                    </span>
                    <h4 className="font-medium text-sm text-center">
                      {cat.name}
                    </h4>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tombol Generate */}
        <button
          onClick={handleGenerate}
          disabled={isProcessing || categoriesLoading}
          className={`w-full max-w-xs mt-6 shadow-lg flex justify-center items-center rounded-2xl h-12 text-white text-lg font-semibold transition-opacity ${
            isProcessing || categoriesLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary cursor-pointer hover:opacity-90"
          }`}
        >
          {isProcessing ? "Memproses..." : "Generate Mosaik"}
        </button>
      </div>
    </section>
  );
};

export default CreateSection;
