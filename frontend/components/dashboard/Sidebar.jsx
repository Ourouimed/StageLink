import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/utils/links";
import { Link2, Linkedin, MapPin, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const dispatch = useDispatch()
  const handleLogout = async ()=>{
    dispatch(logout())
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      
      {/* ===== Profile Card ===== */}
      <div className="border border-gray-200 rounded-xl p-3 mb-6 divide-y divide-gray-300">
        <div className="flex items-center gap-3 pb-2">
          <div className="p-1 border-2 border-main rounded-full">
            <Image
              src={user?.profile || "/assets/images/fallback-profile.png"}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>

          <div className="leading-tight">
            <h4 className="font-semibold text-gray-800">
              {user?.role === "entreprise"
                ? user?.nom_entreprise
                : `${user?.nom} ${user?.prenom}`}
            </h4>
            <span className="text-xs text-gray-500 capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{user?.ville || "—"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Link2 size={14} />
            <Link
              href={user?.website || "#"}
              className="text-main hover:underline"
              target="_blank"
            >
              website
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Linkedin size={14} />
            <Link
              href={user?.linkedin || "#"}
              className="text-[#0A66C2] hover:underline"
              target="_blank"
            >
              linkedin
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {dashboardLinks[user?.role]?.map(({ url, name }) => {
            const isActive = pathname === url;

            return (
              <li key={name}>
                <Link
                  href={url}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-main text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ===== Logout Button ===== */}
      <Button
        onClick={handleLogout}
        className="justify-center"
        size="sm"
        variant="main" 
        outline
      >
        <LogOut size={16} />
        Logout
      </Button>
    </aside>
  );
}
