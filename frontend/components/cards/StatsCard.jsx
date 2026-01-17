export const StatCard = ({ title, value, sub, color, icon: Icon })=>{
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-semibold uppercase">{title}</span>
                <span className={`text-2xl font-black my-1 ${color}`}>{value}</span>
                <span className="text-gray-400 text-[10px]">{sub}</span>
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
        </div>
    );
}