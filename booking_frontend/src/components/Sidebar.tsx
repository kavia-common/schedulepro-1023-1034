"use client";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "Admin Dashboard" },
  { href: "/admin/appointments", label: "Manage Appointments" },
  { href: "/admin/schedule", label: "Set Availability" },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || user.role !== "admin") {
    return <aside className="w-0 hidden" />;
  }

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-4rem)] py-8 px-4 bg-secondary border-r border-gray-200 gap-2">
      <h3 className="mb-3 font-bold text-primary text-md px-1">Admin Panel</h3>
      {ADMIN_LINKS.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded px-3 py-2 font-medium transition text-left ${
            pathname === link.href
              ? "bg-white border-l-4 border-accent text-primary"
              : "hover:bg-[#e8f0fe] text-gray-700"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
