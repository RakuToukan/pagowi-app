import Link from "next/link";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="h-dvh xl:h-1/2 bg-secondary py-12 flex flex-col gap-10 text-primary border-t-2 border-secondary">
      <div className=" w-5/6 md:w-3/4 xl:w-2/3 h-fit xl:flex-row m-auto justify-between grid xl:grid-cols-3 gap-10  ">
        <div className=" h-full  flex flex-col gap-5">
          <div>
            <h1 className="font-bold text-2xl">PAG OWI</h1>
            <h3 className="font-semibold">
              Photomosaic Art Generator : <br />
              Optical Weighted Indexing
            </h3>
          </div>
        </div>
        {/* Menu Kilat */}
        <div className=" h-fit  flex flex-col">
          <h3 className="font-semibold">Menu Kilat</h3>
          <Link href="#hero" className="hover:underline">
            Home
          </Link>
          <Link href="#about" className="hover:underline">
            About Us
          </Link>
        </div>
        {/* CTA Button */}
        <div className="" id="cta">
          <Link
            href="#create"
            className="text-secondary font-semibold items-center justify-center flex bg-primary hover:bg-secondary transition-colors min-w-40 rounded-full w-50 h-10 px-5 shadow-xl  hover:text-primary"
          >
            Buat Mosaikmu!
          </Link>
        </div>
      </div>
      <div className="  w-5/6 h-12 flex justify-center items-center text-center border-t border-primary mx-auto">
        <p className="">&copy; 2026 Godhi Team</p>
      </div>
    </footer>
  );
};

export default Footer;
