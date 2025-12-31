import { menu } from "@/utils/links";
import { Button } from "../ui/Button";

export default function Header ({isSticky}){
    return <header className={`${isSticky ? "sticky top-0": "fixed top-0 w-full"} py-8 px-20 flex items-center justify-between`}>
        <h3 className="text-2xl font-bold">Stage<span className="text-main">Link</span></h3>

        <div className="flex items-center gap-8">
            <nav>
                <ul className="flex items-center gap-4">
                    {menu.map(({name , url}) => <li key={name}>
                        <a className='text-lg transition duration-300 hover:text-main' href={url} aria-label={name}>{name}</a>
                    </li>)}
                </ul>
            </nav>

            <div>
                <Button variant="main" href={'/register'}>
                    Inscriver vous
                </Button>
            </div>
        </div>
    </header>
}