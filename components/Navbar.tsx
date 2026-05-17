"use client";

import Link from "next/link";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Detect click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-5 z-10 bg-white rounded-full mx-auto w-5/6 h-15 md:h-20 left-1/2 transform -translate-x-1/2 shadow-md">
      <div className="w-full h-full px-8 flex justify-between items-center">
        <div className="" id="logo">
          <h3 className="text-xl font-bold md:text-xl lg:text-2xl">PAG OWI</h3>
          <h5 className="text-xs md:text-base lg:text-lg">
            Photomosaic Art Generator
          </h5>

          {/* Hamburger Button */}
        </div>
        <div className="xl:hidden">
          <button
            id="hamburger"
            name="hamburger"
            type="button"
            className=""
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={buttonRef}
          >
            {/* Menu Icon */}
            <div className={`scale-120 ${isMenuOpen ? "hidden" : "flex"}`}>
              <span className="material-symbols-rounded text-5xl">menu</span>
            </div>
            {/* Close Icon */}
            <div className={`scale-120 ${isMenuOpen ? "flex" : "hidden"}`}>
              <span className="material-symbols-rounded text-5xl">close</span>
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          ref={menuRef}
          className={`absolute top-24 right-0 flex flex-col gap-5 duration-300 origin-top text-center bg-white p-5 rounded-2xl ${
            isMenuOpen ? "scale-y-100" : "scale-y-0"
          } xl:scale-y-100 xl:bg-transparent xl:flex-row xl:relative xl:top-auto xl:right-auto`}
          id="navButton"
        >
          <Link
            href="#home"
            className="nav relative text-md tracking-normal hover:text-black"
          >
            Home
          </Link>
          <Link
            href="#service"
            className="nav relative items-center text-md tracking-normal hover:text-black"
          >
            Our Service
          </Link>
          <Link
            href="#pricing"
            className="nav relative text-md tracking-normal hover:text-black"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="nav relative text-md tracking-normal hover:text-black"
          >
            About Us
          </Link>
        </nav>

        {/* CTA-Button */}
        <div
          className="hidden xl:flex bg-primary hover:bg-secondary transition-colors min-w-40 items-center justify-center rounded-full h-10 px-5 shadow-xl"
          id="cta"
        >
          <Link href="#create" className="text-secondary font-semibold">
            Buat Mosaikmu!
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
