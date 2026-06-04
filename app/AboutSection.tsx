import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-dvh z-5 bg-primary pt-15 lg:pt-20"
    >
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-12 mx-auto max-w-5xl h-full">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-secondary md:text-5xl lg:text-6xl text-center">
          Tentang Kami
        </h1>
        {/* Personal Card */}
        <div className="w-fit items-center gap-10 mt-5 flex flex-wrap">
          {/* Rafif */}
          <div
            id="rafif"
            className="w-60 h-80 bg-secondary flex flex-col items-center justify-center rounded-2xl shadow-lg"
          >
            <Image
              src="/profile/rafif-profile.png"
              alt="Rafif"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <h3 className="text-xl font-bold text-primary mt-4">
              Rafif Rizal Ali Ahmadi
            </h3>
            <h4 className="text-lg text-primary">Backend Developer</h4>
          </div>
          {/* Aldi */}
          <div
            id="Aldi"
            className="w-60 h-80 bg-secondary flex flex-col items-center justify-center rounded-2xl shadow-lg"
          >
            <Image
              src="/profile/aldi-profile.png"
              alt="Aldi"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <h3 className="text-xl font-bold text-primary mt-4">
              M Aldi Nur Cholis
            </h3>
            <h4 className="text-lg text-primary">IT Support</h4>
          </div>
          {/* Rakha */}
          <div
            id="Rakha"
            className="w-60 h-80 bg-secondary flex flex-col items-center justify-center rounded-2xl shadow-lg"
          >
            <Image
              src="/profile/rakha-profile.png"
              alt="Rakha"
              width={200}
              height={200}
              className="rounded-2xl"
            />
            <h3 className="text-xl font-bold text-primary mt-4">
              Rakha Ariqah Wijaya
            </h3>
            <h4 className="text-lg text-primary">Frontend Developer</h4>
          </div>
        </div>
        <div className="border-t-2 border-y-secondary">
          <p className="text-lg text-secondary text-center mt-10">
            PAG OWI lahir dari sebuah ide sederhana: Bagaimana jika kita bisa
            melihat gambaran besar dari ribuan momen kecil yang kita miliki?
            Dari sana, kami mengembangkan Photomosaic Art Generator : OWI,
            sebuah web app cerdas yang dirancang untuk mengubah koleksi foto
            digital Anda menjadi sebuah karya seni mosaik yang. Kami tidak
            menggunakan trik filter instan. Aplikasi ini sepenuhnya memanfaatkan
            algoritma KNN (K-Nearest Neighbors) untuk berburu foto kecil yang
            paling pas untuk mengisi setiap sudut piksel gambar Anda. Melalui
            pendekatan Data Science yang presisi dan antarmuka web yang
            intuitif, PAG OWI hadir untuk membantu para kreator, ilustrator, dan
            pencinta seni digital menciptakan karya visual tanpa batas. Hidup
            Jokowi!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
