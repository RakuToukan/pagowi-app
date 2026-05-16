import React from "react";

const CreateSection = () => {
  return (
    <section id="create" className="relative h-dvh z-5 bg-secondary">
      <div className="flex flex-col items-center justify-center p-4 gap-5 mx-20 h-full">
        <div>
          <h1 className="text-4xl font-bold text-gray-700 md:text-5xl md:mx-10 lg:text-6xl">
            Buat Mosaikmu!
          </h1>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-15 h-fit lg:flex-row">
          <div id="upload-container" className="w-full h-50 lg:w-2/3">
            <div className="mb-2 text-xl font-semibold text-gray-700">
              <h2>1. Upload Gambar Referensi</h2>
            </div>
            <div className="border-2 border-dashed border-gray-500 rounded-2xl h-full flex items-center justify-center ">
              Drop Image
            </div>
          </div>
          <div id="mosaic-container" className="w-full h-50 lg:w-1/3">
            <div className="mb-2 text-xl font-semibold text-gray-700">
              <h2>2. Upload Pengisi Mosaik</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] overflow-auto w-full gap-4 border-2 border-dashed border-gray-500 rounded-2xl h-full items-center justify-center p-2">
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 fill-secondary rounded-2xl w-20 h-20 flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl">image</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-10 bg-primary shadow-lg flex justify-center items-center rounded-2xl h-12 text-white text-lg font-semibold cursor-pointer">
          Button
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
