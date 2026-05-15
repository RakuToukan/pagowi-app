import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-dvh z-5 bg-secondary">
      <div className="relative w-full h-full rounded-b-4xl bg-primary">
        <div className="w-full h-1/2 absolute bottom-0">
          <Image
            src="/building-images.webp"
            fill
            alt="Jokowi Mosaic"
            className="object-cover opacity-70 brightness-70 rounded-b-4xl"
          />
        </div>
      </div>
      <div className="hero-cta absolute inset-0 flex flex-col items-center text-center mx-10 mt-10 justify-evenly lg:flex-row md:mx-20 lg:mx-50">
        <h1 className="text-4xl font-bold mx-10 text-white md:text-5xl lg:text-6xl lg:w-3/4">
          Ubah Fotomu jadi Seni Mosaik Profesional dalam Hitungan Detik
        </h1>

        <div className="mt-5 w-70 h-100 relative shadow-2xl md:w-80 md:h-110 lg:w-96 lg:h-144">
          <Image
            src="/hero-jokowi.png"
            fill
            alt="Profile Image"
            className="rounded-4xl object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
