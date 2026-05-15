import Link from "next/link";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const Button = ({ children, variant = "primary", className }: ButtonProps) => {
  const variants = {
    primary: "bg-primary text-white px-7 py-3 rounded-full text-lg",
    secondary:
      "bg-white text-primary px-5 py-3 rounded-full text-sm md:text-base lg:text-lg",
  };

  return (
    <>
      <button>
        <Link href="/donasi" className={clsx(variants[variant], className)}>
          {children}
        </Link>
      </button>
    </>
  );
};

export default Button;
