
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">
                            Stage<span className="text-main">Link</span>
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            La plateforme numéro 1 pour connecter les étudiants talentueux avec les meilleures entreprises pour des stages inoubliables.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-main transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-main transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-main transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-main transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Navigation</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/" className="hover:text-main transition-colors">Accueil</Link></li>
                            <li><Link href="/etudiant/offre-stages" className="hover:text-main transition-colors">Offres de stage</Link></li>
                            <li><Link href="/" className="hover:text-main transition-colors">Entreprises</Link></li>
                            <li><Link href="/" className="hover:text-main transition-colors">Conseils & Blog</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Légal</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/privacy" className="hover:text-main transition-colors">Politique de confidentialité</Link></li>
                            <li><Link href="/terms" className="hover:text-main transition-colors">Conditions d'utilisation</Link></li>
                            <li><Link href="/faq" className="hover:text-main transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-6 text-gray-900">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex gap-3 items-start">
                                <MapPin size={18} className="text-main flex-shrink-0 mt-0.5" />
                                <span>123 Avenue Mohamed V, Rabat, Maroc</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone size={18} className="text-main flex-shrink-0" />
                                <span>+212 5 22 00 00 00</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={18} className="text-main flex-shrink-0" />
                                <span>contact@stagelink.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} StageLink. Tous droits réservés.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-900">Confidentialité</Link>
                        <Link href="/terms" className="hover:text-gray-900">Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
