"use client";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/book", label: "Book" },
  { href: "/admin", label: "Admin", admin: true },
];

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="fixed w-full z-30 h-16 bg-white shadow flex items-center justify-between px-6 border-b border-b-secondary">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-lg text-primary">
          SchedulePro
        </Link>
        <nav className="hidden md:flex gap-3 ml-8">
          {NAV_LINKS.filter(l =>
            l.admin ? user?.role === "admin" : true
          ).map(link => (
            <Link
              href={link.href}
              key={link.href}
              className={`hover:text-accent px-2 py-1 rounded transition font-medium ${
                pathname === link.href ? "text-primary" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-800">
              {user.role === "admin" && <b>Admin</b>} {user.email}
            </span>
            <button
              className="px-3 py-1 rounded bg-accent text-white hover:bg-primary font-semibold ml-2"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded bg-primary px-4 py-1.5 text-white font-semibold hover:bg-accent"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
