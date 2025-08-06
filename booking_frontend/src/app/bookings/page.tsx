"use client";
import { useAuth } from "@/lib/AuthContext";
import api from "@/lib/api";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  date: string;
  time: string;
  status: string;
};

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    const res = await api.get("/appointments/my");
    setBookings(res.data);
    setLoading(false);
  }

  useEffect(() => {
    if (user) loadBookings();
  }, [user]);

  async function handleCancel(id: string) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.post(`/appointments/cancel/${id}`);
      setMessage("Booking cancelled.");
      loadBookings();
    } catch {
      setMessage("Unable to cancel booking.");
    }
  }

  if (!user)
    return (
      <div className="p-8">
        <div className="bg-secondary rounded-xl p-8">
          Please login to view your bookings.
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-primary">My Bookings</h1>
      {message && <div className="text-accent mb-4">{message}</div>}
      {loading && <div>Loading...</div>}
      <div className="space-y-3">
        {bookings.map(b => (
          <div
            key={b.id}
            className="flex items-center justify-between bg-white rounded shadow px-4 py-3"
          >
            <div>
              <div className="font-semibold">
                {b.date} at {b.time}
              </div>
              <div className="text-xs text-gray-500">{b.status}</div>
            </div>
            {b.status === "booked" && (
              <button
                onClick={() => handleCancel(b.id)}
                className="text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-100 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
        {bookings.length === 0 && !loading && (
          <div className="text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
}
