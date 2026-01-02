import { menu } from '@/utils/links';
import { X } from 'lucide-react'; 
import Link from 'next/link';
import { Button } from './ui/Button';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function MobileMenu({ isOpen, onClose }) {
    const { user } = useSelector(state => state.auth)
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose} 
      />

      <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-30 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        <div>
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <span className="font-bold text-xl text-black">Menu</span>
          <Button 
            onClick={onClose}
            className="!p-2 aspect-square"
          >
            <X size={24}/>
          </Button>
        </div>

        <nav>
            <ul className="flex flex-col p-4 gap-6">
                  {menu.map(({ name, url }) => (
                    <li key={name}>
                        <Link href={url} className="text-lg hover:text-main transition">
                        {name}
                        </Link>
                    </li>
                  ))}
            </ul>
          
          
          
        </nav>
        </div>


        { /* User Profile */}
        <div className='p-4 border-t border-gray-300'>
            {user ? <div className='flex items-center gap-3'>
                <div className="p-1 border-2 border-main rounded-full">
                        <Image
                            src={user.profile || "/assets/images/fallback-profile.png"}
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <h4 className='font-semibold'>{user?.prenom}{" "} {user?.nom}</h4>
                        <span className='text-sm text-gray-500'>{user?.email}</span>
                    </div>
            </div> : (
                      <Button variant="main" href="/register">
                        Inscrivez-vous
                      </Button>
                    )}
        </div>
      </div>
    </>
  );
}