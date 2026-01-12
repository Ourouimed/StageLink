export const Badge = ({ text, icon: Icon, variant = "default" }) => {
  const variants = {
    default: "bg-second text-gray-900",
    primary: "bg-main text-white",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    outline: "border border-gray-200 text-gray-600"
  };

  const activeVariant = variants[variant] || variants.default;

  return (
    <h4 className={`inline-flex px-6 py-2 font-semibold text-sm rounded-full items-center gap-2 ${activeVariant}`}>
        {Icon && (
          <span className="size-6 rounded-full bg-black/10 flex items-center justify-center">
            <Icon size={12} />
          </span>
        )}
        {text}
    </h4>
  );
};