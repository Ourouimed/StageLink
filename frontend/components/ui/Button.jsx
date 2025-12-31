export const Button = ({children , className , variant = "DEFAULT" , href})=>{
    const variants = {
        DEFAULT : " bg-black text-white" ,
        MAIN : "bg-main text-white"
    }


    const btnStyle = `inline-flex gap-4 py-3 px-6 rounded-lg font-semibold ${variants[variant.toUpperCase() || "DEFAULT"]}
                               cursor-pointer  ${className}`

    if (href){
        return <a className={btnStyle} href={href}>
        {children}
    </a>
    }
    return <button className={btnStyle} >
        {children}
    </button>
}