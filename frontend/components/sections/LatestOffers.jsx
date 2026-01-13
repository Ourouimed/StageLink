import Link from 'next/link';
import { MapPin, Clock, Building2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllStages } from '@/store/features/offre-stage/offreStageSlice';

function timeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "À l'instant";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Il y a ${days}j`;
    const months = Math.floor(days / 30);
    if (months < 12) return `Il y a ${months} mois`;
    return `Il y a ${Math.floor(months / 12)} an(s)`;
}

export default function LatestOffers() {

    const { stages : offers } = useSelector(state => state.stage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllStages())
    }, [dispatch])

    const latestStages = Array.isArray(offers) ? offers.slice(0, 3) : [];

    return (
        <section className="py-20">
            <div className="px-4 md:px-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dernières offres de stage</h2>
                        <p className="text-gray-600">
                            Découvrez les dernières opportunités publiées par nos entreprises partenaires.
                        </p>
                    </div>
                    <Link href="/etudiant/offre-stages" className="hidden md:flex items-center text-main font-semibold hover:gap-2 transition-all">
                        Voir toutes les offres <ArrowRight size={20} className="ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {latestStages.map((stage) => (
                        <div key={stage.stage_id} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                    <Building2 size={24} className="text-gray-400 group-hover:text-main transition-colors" />
                                </div>
                                <Badge text={stage.type_stage}/>
                            </div>

                            <h3 className="text-lg font-bold mb-2 group-hover:text-main transition-colors line-clamp-1" title={stage.titre}>
                                {stage.titre}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 font-medium line-clamp-1">
                                {stage.entreprise?.nom_entreprise || 'Entreprise confidentielle'}
                            </p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                                    <span className="truncate">{stage.ville}</span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Clock size={16} className="mr-2 flex-shrink-0" />
                                    <span>{stage.duree_months} mois • {timeAgo(stage.created_at)}</span>
                                </div>
                            </div>

                           
                        </div>
                    ))}
                    {latestStages.length === 0 && (
                        <div className="col-span-3 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500">Aucune offre disponible pour le moment.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/etudiant/offre-stages" className="inline-flex items-center text-main font-semibold">
                        Voir toutes les offres <ArrowRight size={20} className="ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
