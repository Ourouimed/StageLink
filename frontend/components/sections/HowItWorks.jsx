
import { Search, Send, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Recherchez",
            description: "Parcourez des centaines d'offres de stage vérifiées dans votre domaine d'études."
        },
        {
            icon: Send,
            title: "Postulez",
            description: "Envoyez votre CV et lettre de motivation directement aux recruteurs en un clic."
        },
        {
            icon: CheckCircle2,
            title: "Décrochez",
            description: "Suivez vos candidatures, passez vos entretiens et signez votre convention."
        }
    ];

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
                    <p className="text-gray-600">
                        StageLink simplifie votre recherche de stage en connectant directement les étudiants
                        et les entreprises sur une plateforme intuitive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-gray-200/50 mb-6 border-4 border-gray-50">
                                <step.icon size={32} className="text-main" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
