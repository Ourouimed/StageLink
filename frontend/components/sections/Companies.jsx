
export default function Companies() {
    const companies = [
        "OCP Group", "Maroc Telecom", "Attijariwafa Bank",
        "CDG", "Royal Air Maroc", "Inwi"
    ];

    return (
        <section className="py-12 border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-20">
                <p className="text-center text-gray-500 text-sm font-medium mb-8">
                    ILS NOUS FONT CONFIANCE
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((name, i) => (
                        <span key={i} className="text-xl md:text-2xl font-bold font-serif text-gray-400 hover:text-gray-800 cursor-default select-none">
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
