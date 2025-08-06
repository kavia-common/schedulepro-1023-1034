"use client";
import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import api from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

type Slot = {
  date: string;
  times: string[]; // e.g. ["09:00", "09:30"]
};

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api.get("/appointments/available").then(res => setAvailableSlots(res.data));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const slot = availableSlots.find(s => s.date === selectedDate);
      setTimes(slot ? slot.times : []);
      setSelectedTime(null);
    }
  }, [selectedDate, availableSlots]);

  async function handleBook() {
    if (!selectedDate || !selectedTime) return;
    try {
      await api.post("/appointments/book", {
        date: selectedDate,
        time: selectedTime,
      });
      setMessage("Appointment booked successfully!");
    } catch {
      setMessage("Booking failed. Please try again.");
    }
  }

  if (!user)
    return (
      <div className="p-10">
        <div className="bg-secondary rounded-xl p-8 font-semibold text-lg">
          Please login to book an appointment.
        </div>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-8">
      <h1 className="text-xl font-bold mb-4 text-primary">Book Appointment</h1>
      {message && <div className="text-accent font-medium mb-4">{message}</div>}
      <Calendar
        slots={availableSlots.map(s => s.date)}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      {selectedDate && (
        <div className="mt-5">
          <h2 className="font-semibold mb-2">
            Available Times for {selectedDate}
          </h2>
          <div className="flex flex-wrap gap-2">
            {times.length === 0 && (
              <div className="text-red-600">No times available</div>
            )}
            {times.map(time => (
              <button
                key={time}
                className={`px-4 py-2 rounded ${
                  selectedTime === time
                    ? "bg-accent text-white"
                    : "bg-secondary hover:bg-primary hover:text-white"
                } font-semibold`}
                onClick={() => setSelectedTime(time)}
                type="button"
              >
                {time}
              </button>
            ))}
          </div>
          {selectedTime && (
            <button
              onClick={handleBook}
              className="mt-6 w-full bg-primary text-white py-2 rounded font-bold hover:bg-accent"
            >
              Confirm Booking
            </button>
          )}
        </div>
      )}
    </div>
  );
}
