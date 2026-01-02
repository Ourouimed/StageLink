import Link from "next/link";
import Image from "next/image";
import { menu } from "@/utils/links";
import { Button } from "../ui/Button";
import { useSelector } from "react-redux";
import { BarChart, Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "../mobile-menu";

export default function Header({ isSticky }) {
  const { user } = useSelector(state => state.auth);
  // mobile Menu 
  const [mobileMenuIsOpen , setMobileMenuIsOpen] = useState(false)

  return (
    <header className={`${isSticky ? "sticky" : "fixed"} top-0 w-full py-6 px-10 md:px-20 flex items-center justify-between z-10`}>
      <h3 className="text-2xl font-bold">
        Stage<span className="text-main">Link</span>
      </h3>

      <div className="hidden md:flex items-center gap-8">
        <nav>
          <ul className="flex items-center gap-4">
            {menu.map(({ name, url }) => (
              <li key={name}>
                <Link href={url} className="text-lg hover:text-main transition">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {user ? <div className="p-1 border-2 border-main rounded-full">
            <Image
                src={user.profile || "/assets/images/fallback-profile.png"}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
            />
        </div> : (
          <Button variant="main" href="/register">
            Inscrivez-vous
          </Button>
        )}
      </div>


      {/* Mobile toggle button */} 
      <Button variant="main" className='md:hidden aspect-square !p-2' onClick={()=>{
        setMobileMenuIsOpen(true)
      }}>
            <Menu/>
      </Button>


      <MobileMenu isOpen={mobileMenuIsOpen} onClose={()=>{
        setMobileMenuIsOpen(false)
      }}/>
    </header>
  );
}
