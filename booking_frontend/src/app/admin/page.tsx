"use client";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "admin")
    return (
      <div className="bg-secondary p-8 mt-10 rounded-xl text-lg font-semibold text-red-600">
        Admin access only.
      </div>
    );

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/appointments"
          className="rounded shadow bg-white p-6 flex flex-col gap-2 hover:bg-secondary transition"
        >
          <span className="font-semibold text-accent">Manage Appointments</span>
          <span>View and control all bookings</span>
        </Link>
        <Link
          href="/admin/schedule"
          className="rounded shadow bg-white p-6 flex flex-col gap-2 hover:bg-secondary transition"
        >
          <span className="font-semibold text-accent">
            Set Available Times
          </span>
          <span>Adjust calendar and working hours</span>
        </Link>
      </div>
    </div>
  );
}
