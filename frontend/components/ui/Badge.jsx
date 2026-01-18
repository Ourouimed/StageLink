
export const Badge = ({ text, variant = 'default', icon: Icon, className = '' }) => {
  const baseStyles = "inline-flex font-bold tems-center gap-1 px-2.5 py-0.5 rounded-full text-xs border";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-800",
    success: "bg-green-100 text-green-800 border-green-800",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-800",
    error: "bg-red-100 text-red-800 border-red-800",
    info: "bg-second text-main border-main",
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
      {text}
    </span>
  );
};

