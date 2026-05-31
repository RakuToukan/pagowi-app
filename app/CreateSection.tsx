"use client";

import React, { useState, useEffect, useRef } from "react";

// Struktur data sampel disesuaikan dengan value kategori yang valid di API
const listSample = [
  { id: 1, name: "Bangunan", icon: "corporate_fare", apiValue: "building" },
  { id: 2, name: "Awan", icon: "cloud", apiValue: "cloud" },
  { id: 3, name: "Alam", icon: "nature", apiValue: "nature" },
  { id: 4, name: "Kendaraan", icon: "directions_car", apiValue: "vehicle" },
];

interface MosaicResponse {
  job_id: string;
  status: string;
  error?: string;
}

const CreateSection = () => {
  // State Input
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("building");

  // State Proses API
  const [status, setStatus] = useState<
    "idle" | "pending" | "processing" | "success" | "failed"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultImageUrl, setResultImageUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE_URL = "http://localhost:8080";

  // Handle ketika user memilih file gambar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Buat preview gambar di UI
    }
  };

  // Fungsi Polling ke API Status
  const startPolling = (jobId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/status/${jobId}`);
        const contentType = res.headers.get("content-type");

        // Jika selesai, response mengembalikan file gambar binary
        if (contentType && contentType.includes("image/")) {
          clearInterval(intervalId);

          const imageBlob = await res.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          setResultImageUrl(imageUrl);
          setStatus("success");
        } else {
          // Jika masih JSON, cek statusnya
          const data: MosaicResponse = await res.json();

          if (data.status === "processing") {
            setStatus("processing");
          } else if (data.status === "failed") {
            clearInterval(intervalId);
            setStatus("failed");
            setErrorMessage(data.error || "Gagal membuat mosaik.");
          }
        }
      } catch (err) {
        console.error(err);
        clearInterval(intervalId);
        setStatus("failed");
        setErrorMessage("Koneksi ke server terputus.");
      }
    }, 3000); // Cek setiap 3 detik
  };

  // Fungsi Kirim Data (Trigger saat tombol diklik)
  const handleGenerate = async () => {
    if (!selectedFile) {
      alert("Silakan upload gambar referensi terlebih dahulu!");
      return;
    }

    setStatus("pending");
    setErrorMessage("");
    setResultImageUrl("");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", selectedCategory);

    try {
      const res = await fetch(`${API_BASE_URL}/mosaic`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengunggah gambar");
      }

      const data: MosaicResponse = await res.json();
      startPolling(data.job_id); // Mulai antrean polling
    } catch (err: any) {
      setStatus("failed");
      setErrorMessage(err.message || "Terjadi kesalahan sistem.");
    }
  };

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
              accept="image/*"
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
                </div>
              )}
            </div>
          </div>

          {/* 2. Hasil / Status Progres */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Hasil Photomosaic
            </h2>
            <div className="border-2 border-dashed border-gray-500 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative">
              {status === "idle" && (
                <p className="text-gray-400">Hasil akan muncul di sini</p>
              )}

              {(status === "pending" || status === "processing") && (
                <div className="text-center px-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
                  <p className="font-medium text-gray-700 capitalize">
                    Status: {status}...
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

        {/* Pilihan Kategori / Sampel */}
        <div className="w-full mt-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            2. Pilih Kategori Pengisi Mosaik :
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {listSample.map((sample) => {
              const isSelected = selectedCategory === sample.apiValue;
              return (
                <div
                  key={sample.id}
                  onClick={() => setSelectedCategory(sample.apiValue)}
                  className={`border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-blue-50 text-primary scale-105"
                      : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
                  }`}
                >
                  <span className="material-symbols-rounded text-4xl">
                    {sample.icon}
                  </span>
                  <h4 className="font-medium text-sm text-center">
                    {sample.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tombol Aksi */}
        <button
          onClick={handleGenerate}
          disabled={status === "pending" || status === "processing"}
          className={`w-full max-w-xs mt-6 shadow-lg flex justify-center items-center rounded-2xl h-12 text-white text-lg font-semibold transition-opacity ${
            status === "pending" || status === "processing"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary cursor-pointer hover:opacity-90"
          }`}
        >
          {status === "pending" || status === "processing"
            ? "Memproses..."
            : "Generate Mosaik"}
        </button>
      </div>
    </section>
  );
};

export default CreateSection;
