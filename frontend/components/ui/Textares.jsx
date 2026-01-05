export const Textarea = ({icon : Icon , className , ...props})=>{
    return <div className="w-full border flex items-center gap-1 border-gray-300 bg-white/5 p-3 rounded-lg focus-within:border-main">
        {Icon && (
          <div className="mr-3 text-gray-300 transition-colors group-focus-within:text-main">
            <Icon size={20} />
          </div>
        )}
        <textarea
            value={props.value ?? ""}
            {...props}
            className={`outline-none focus:border-main transition w-full resize-none min-h-24 max-h-60 resize-vertical ${className}`}
            />
    </div>
}