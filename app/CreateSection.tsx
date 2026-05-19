import React from "react";

const listSample = [
  { id: 1, name: "Hutan", icon: "forest" },
  { id: 2, name: "Laut", icon: "pool" },
  { id: 3, name: "Jepang", icon: "ramen_dining" },
  { id: 4, name: "Salju", icon: "snowflake" },
  { id: 5, name: "Sawit", icon: "nature" },
  { id: 6, name: "Makanan", icon: "food_bank" },
  { id: 7, name: "Indonesia", icon: "payments" },
];

const CreateSection = () => {
  return (
    <section
      id="create"
      className="relative min-h-dvh z-5 bg-secondary pt-15 lg:pt-20"
    >
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-12 mx-auto max-w-5xl h-full">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-gray-700 md:text-5xl lg:text-6xl text-center">
          Buat Mosaikmu!
        </h1>
        {/* Container Upload */}
        <div className="w-full flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          {/* Upload Gambar Referensi */}
          <div className="w-full lg:w-2/3">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              1. Upload Gambar Referensi
            </h2>
            <div className="border-2 border-dashed border-gray-500 rounded-2xl h-48 flex items-center justify-center">
              Drop Image
            </div>
          </div>

          {/* Upload Pengisi Mosaik */}
          <div className="w-full lg:w-1/3">
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              2. Upload Pengisi Mosaik
            </h2>
            <div className="flex flex-wrap gap-3 border-2 border-dashed border-gray-500 rounded-2xl h-48 overflow-auto p-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="border-2 border-dashed border-gray-300 rounded-2xl w-20 h-20 flex items-center justify-center"
                >
                  <span className="material-symbols-rounded text-5xl">
                    image
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample */}
        <div className="w-full">
          <h3>Coba Sampel Gambar dari Kami :</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3 h-48 overflow-auto p-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="border-2 border-dashed border-gray-300 overflow-auto rounded-2xl w-full h-30 flex flex-col items-center justify-center gap-5"
              >
                <h4 className="mt-5">{listSample[i].name}</h4>
                <span className="material-symbols-rounded text-5xl h-full">
                  {listSample[i].icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full max-w-xs mt-6 bg-primary shadow-lg flex justify-center items-center rounded-2xl h-12 text-white text-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity">
          Button
        </button>
      </div>
    </section>
  );
};

export default CreateSection;
