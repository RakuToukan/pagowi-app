import React from "react";

const EmbedStreamlit = () => {
  return (
    <section
      id="create"
      className="relative min-h-dvh z-5 bg-secondary pt-15 lg:pt-20"
    >
      <div className="flex flex-col items-center gap-5 px-6 py-12 mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-700 md:text-5xl lg:text-6xl text-center">
          Buat Mosaikmu!
        </h1>
        <iframe
          src="https://pag-owi.streamlit.app/?embed=true"
          width="100%"
          height="800px"
          style={{ border: "none", borderRadius: "16px" }}
        />
      </div>
    </section>
  );
};

export default EmbedStreamlit;
