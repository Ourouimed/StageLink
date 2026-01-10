import Link from "next/link";

export const Button = ({
  children,
  className = "",
  variant = "DEFAULT",
  size = "md",
  href,
  outline = false , 
  ...props
}) => {
  const variants = {
    DEFAULT: `${outline ? 'bg-transparent hover:bg-black hover:text-white text-black border-black' : 'bg-black text-white'}` ,
    MAIN: `${outline ? 'bg-transparent hover:bg-main hover:text-white text-main border-main' : "bg-main text-white"}`,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const btnStyle = `
    border
    inline-flex items-center gap-4 rounded-lg font-semibold
    transition duration-300 cursor-pointer
    ${variants[variant.toUpperCase()] || variants.DEFAULT}
    ${sizes[size] || sizes.md}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={btnStyle} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={btnStyle} {...props}>
      {children}
    </button>
  );
};
