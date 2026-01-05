import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/utils/links";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">

      <div className="flex items-center gap-3 p-3 mb-6 border border-gray-200 rounded-xl">
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
              ? user.entreprise
              : `${user?.nom} ${user?.prenom}`}
          </h4>
          <span className="text-xs text-gray-500 capitalize">
            {user?.role}
          </span>
        </div>
      </div>


      <nav>
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
    </aside>
  );
}
