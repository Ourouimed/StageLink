import Image from "next/image";
import { Briefcase, ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50/50 to-white overflow-hidden py-30 md:py-20">
      <div className="px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        
        <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <Badge text='Bienvenue sur StageLink' icon={Briefcase} className="animate-fade-in-up" variant="info" />

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            Trouvez le stage qui <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-blue-400">
              lance votre carrière
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
            La plateforme idéale pour connecter les étudiants ambitieux avec les meilleures entreprises. Démarrez votre avenir professionnel aujourd'hui.
          </p>

          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
            <Button  href="/register" variant='main'>
              Commencer maintenant
            </Button>
            <Button variant="main" outline href="/etudiant/offre-stages" className="h-12 px-8 text-lg group">
              Explorer les offres
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
              ))}
            </div>
            <p>Rejoint par +2000 étudiants</p>
          </div>
        </div>

        
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl transform scale-90 translate-y-4 animate-pulse" />
            <Image
              src="/assets/images/team.png"
              alt="Illustration de stage et carrière"
              fill
              className="object-contain hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
