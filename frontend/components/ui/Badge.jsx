
export const Badge = ({ text, variant = 'default', icon: Icon, className = '' }) => {
  const baseStyles = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
      {text}
    </span>
  );
};

