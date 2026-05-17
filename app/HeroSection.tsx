import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-dvh z-5 bg-secondary">
      {/* Background Image */}
      <div className="relative w-full h-full rounded-b-4xl bg-primary">
        <div className="w-full h-1/2 absolute bottom-0">
          <Image
            src="/building-images.webp"
            fill
            alt="Building Images"
            loading="eager"
            className="object-cover opacity-70 brightness-70 rounded-b-4xl"
          />
        </div>
      </div>
      {/* Call to Action */}
      <div className="hero-cta absolute inset-0 flex flex-col items-center text-center mx-10 mt-20 justify-evenly lg:flex-row md:mx-20 lg:mx-50">
        <div className="flex-col gap-5 flex items-center justify-center">
          <div className="text-4xl font-bold text-white md:text-5xl md:mx-10 lg:text-6xl lg:w-3/4">
            <h1>
              Ubah Fotomu jadi Seni Mosaik Profesional dalam Hitungan Detik
            </h1>
          </div>
          <div
            className="xl:hidden flex bg-secondary hover:bg-primary transition-colors max-w-50 items-center justify-center rounded-full h-10 px-5 shadow-xl m-auto"
            id="cta"
          >
            <Link
              href="#create"
              className="text-primary font-semibold hover:text-secondary"
            >
              Buat Mosaikmu!
            </Link>
          </div>
        </div>
        {/* Profile Image */}
        <div className="mt-5 min-w-70 h-100 relative">
          <Image
            src="/hero-jokowi.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            alt="Profile Image"
            className="rounded-4xl object-cover w-full h-full shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
