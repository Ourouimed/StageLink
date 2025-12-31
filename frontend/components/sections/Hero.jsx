import { Briefcase, Zap } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-20">
        <div className="space-y-6">
            <Badge text='Bienvenue sur StageLink' icon={Briefcase}/>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Trouvez le stage qui lance votre carrière
            </h1>
            <p className="text-gray-700 text-lg md:text-xl">
                Trouvez facilement votre prochain stage et boostez votre carrière.
            </p>
            <Button variant="main" href="/insr">
                <Briefcase/>
                Trouver un stage
            </Button>
        </div>
        <div className="flex items-center justify-center">
          
        </div>
      </div>
    </section>
  );
}
