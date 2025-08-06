"use client";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-extrabold text-primary">
        Welcome to SchedulePro!
      </h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="p-6 rounded-xl shadow bg-white">
          <h2 className="font-bold text-lg mb-2 text-accent">Book Appointment</h2>
          <p>Find and book your next appointment.</p>
          <Link
            href="/book"
            className="mt-3 inline-block bg-primary text-white font-semibold py-1 px-4 rounded hover:bg-accent"
          >
            Book Now
          </Link>
        </div>
        <div className="p-6 rounded-xl shadow bg-white">
          <h2 className="font-bold text-lg mb-2 text-accent">My Bookings</h2>
          <p>View or manage your upcoming appointments.</p>
          <Link
            href="/bookings"
            className="mt-3 inline-block bg-primary text-white font-semibold py-1 px-4 rounded hover:bg-accent"
          >
            View Bookings
          </Link>
        </div>
        {user?.role === "admin" && (
          <div className="p-6 rounded-xl shadow bg-white">
            <h2 className="font-bold text-lg mb-2 text-accent">Admin Dashboard</h2>
            <p>Manage schedules, appointments and availability.</p>
            <Link
              href="/admin"
              className="mt-3 inline-block bg-accent text-white font-semibold py-1 px-4 rounded hover:bg-primary"
            >
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
