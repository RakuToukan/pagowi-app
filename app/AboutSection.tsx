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
            digital menjadi sebuah karya seni mosaik. Kami tidak menggunakan
            trik filter instan. Aplikasi ini sepenuhnya memanfaatkan algoritma
            KNN (K-Nearest Neighbors) untuk berburu foto kecil yang paling pas
            untuk mengisi setiap sudut piksel gambar Anda. Melalui pendekatan
            Artificial Intelligence yang presisi dan antarmuka web yang
            intuitif, PAG OWI hadir untuk membantu para kreator, ilustrator, dan
            pencinta seni digital menciptakan karya visual tanpa batas.
          </p>
          <h3 className="text-2xl font-bold text-secondary text-center mt-10">
            Cara Kerja Photomosaic Generator dengan Algoritma KNN
          </h3>

          <p className="text-lg text-secondary mt-10 text-justify">
            1. Pengguna mengunggah gambar referensi yang ingin diubah menjadi
            mosaik,memilih metode jarak, memilih ukuran grid, dan memilih
            kategori tema foto kecil sebagai pengisi mosaik (misalnya, foto
            bangunan, hutan, gunung, dll).
            <br />
            2. Sistem memecah gambar referensi menjadi beberapa tile/grid yang
            telah ditentukan pengguna, dimana setiap tile terdiri dari kumpulan
            piksel kecil.
            <br />
            3. Setiap pixel dalam tile diambil RGB dan dihitung rata-ratanya
            hingga didapat rata-rata RGB untuk setiap tile.
            <br />
            4. Di belakang layar (backend), sistem menghitung rata-rata RGB tiap
            foto kecil sebagai label klasifikasi yang ada di database untuk
            mengisi mosaik.
            <br />
            5.Algoritma KNN memilih 1 foto kecil (K = 1) terdekat dengan cara
            menghitung jarak (misalnya, menggunakan jarak Euclidean) antara
            rata-rata RGB tile dan rata-rata RGB foto kecil dalam database. Foto
            kecil dengan jarak terkecil atau terdekat dipilih untuk mengisi tile
            mosaik.
            <br />
            5. Proses ini diulang untuk setiap tile dalam gambar referensi
            hingga seluruh gambar mosaik terbentuk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
