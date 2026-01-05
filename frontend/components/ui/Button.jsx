import Link from "next/link";

export const Button = ({
  children,
  className = "",
  variant = "DEFAULT",
  size = "md",
  href,
  ...props
}) => {
  const variants = {
    DEFAULT: "bg-black text-white",
    MAIN: "bg-main text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const btnStyle = `
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
