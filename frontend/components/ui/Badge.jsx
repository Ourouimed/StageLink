export const Badge = ({ text , icon : Icon}) => {
  return (
    <h4 className="inline-flex bg-second  px-6 py-2 text-semibold text-sm rounded-full flex items-center gap-2">
        {Icon && <span className="size-6 rounded-full bg-main flex items-center justify-center">
            <Icon size={12} className='text-white'/>
        </span>}
        {text}
    </h4>
  );
};
