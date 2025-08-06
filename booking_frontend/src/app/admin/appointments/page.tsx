"use client";
import { useAuth } from "@/lib/AuthContext";
import api from "@/lib/api";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  user_email: string;
  date: string;
  time: string;
  status: string;
};

export default function AdminAppointments() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await api.get("/admin/appointments");
    setBookings(res.data);
  }

  useEffect(() => {
    if (user?.role === "admin") load();
  }, [user]);

  async function handleCancel(id: string) {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.post(`/admin/appointments/cancel/${id}`);
      setMessage("Cancelled.");
      load();
    } catch {
      setMessage("Unable to cancel.");
    }
  }

  if (!user || user.role !== "admin")
    return (
      <div className="p-8">
        <div className="bg-secondary rounded-xl p-8">Admin access only.</div>
      </div>
    );

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 text-primary">
        Appointments Management
      </h1>
      {message && <div className="text-accent mb-3">{message}</div>}
      <table className="w-full bg-white rounded shadow mb-5">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left">User</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td className="px-3 py-2">{b.user_email}</td>
              <td className="px-3 py-2">{b.date}</td>
              <td className="px-3 py-2">{b.time}</td>
              <td className="px-3 py-2">{b.status}</td>
              <td className="px-3 py-2">
                {b.status === "booked" && (
                  <button
                    className="px-3 py-1 text-red-700 border border-red-400 rounded hover:bg-red-100"
                    onClick={() => handleCancel(b.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookings.length === 0 && (
        <div className="text-gray-500">No appointments found.</div>
      )}
    </div>
  );
}
