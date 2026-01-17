"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/utils/links";
import { Link2, Linkedin, MapPin, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";

export default function Sidebar({ user, onNavigate }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <aside className="w-full h-full bg-white border-r border-gray-200 p-4 flex flex-col">
      
      {/* ===== Profile Card ===== */}
      <div className="border border-gray-200 rounded-xl p-3 mb-6 divide-y divide-gray-300">
        <div className="flex items-center gap-3 pb-2">
          <div className="p-1 border-2 border-main rounded-full shrink-0">
            <Image
              src={user?.profile || "/assets/images/fallback-profile.png"}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full object-cover aspect-square"
            />
          </div>

          <div className="leading-tight overflow-hidden">
            <h4 className="font-semibold text-gray-800 truncate">
              {user?.role === "entreprise"
                ? user?.nom_entreprise
                : `${user?.nom} ${user?.prenom}`}
            </h4>
            <span className="text-xs text-gray-500 capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {user.role !== 'admin' &&
        <div className="pt-2 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{user?.ville || "—"}</span>
          </div>

          <div className="flex items-center gap-2 overflow-hidden">
            <Link2 size={14} className="shrink-0" />
            <Link
              href={user?.website || "#"}
              className="text-main hover:underline truncate"
              target="_blank"
            >
              website
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-hidden">
            <Linkedin size={14} className="shrink-0" />
            <Link
              href={user?.linkedin || "#"}
              className="text-[#0A66C2] hover:underline truncate"
              target="_blank"
            >
              linkedin
            </Link>
          </div>
        </div>
        }
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
                  onClick={onNavigate} 
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

      
      <div className="pt-4 border-t border-gray-100 mt-auto">
        <Button
          onClick={handleLogout}
          className="w-full justify-center gap-2"
          size="sm"
          variant="main" 
          outline
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </aside>
  );
}