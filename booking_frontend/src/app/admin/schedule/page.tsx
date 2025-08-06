"use client";
import { useAuth } from "@/lib/AuthContext";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";

export default function AdminSchedulePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [daySlots, setDaySlots] = useState<string[]>([]);
  const [editState, setEditState] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/schedule").then(res => setSlots(res.data));
  }, []);

  useEffect(() => {
    if (selectedDate)
      api.get(`/admin/schedule/${selectedDate}`).then(res =>
        setDaySlots(res.data.times)
      );
  }, [selectedDate]);

  async function saveSlots() {
    await api.post(`/admin/schedule/${selectedDate}`, {
      times: daySlots,
    });
    setMessage("Updated!");
    setEditState(false);
    api.get("/admin/schedule").then(res => setSlots(res.data));
  }

  if (!user || user.role !== "admin")
    return (
      <div className="bg-secondary p-8 mt-10 rounded-xl font-semibold text-red-600">
        Admin access only.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-bold text-xl mb-5  text-primary">
        Set or Update Available Times
      </h1>
      {message && <div className="text-accent mb-2">{message}</div>}
      <Calendar slots={slots} selected={selectedDate} onSelect={setSelectedDate} />
      {selectedDate && (
        <div className="mt-5">
          <h2 className="mb-2 font-semibold">
            Manage Time Slots for {selectedDate}
          </h2>
          {editState ? (
            <DaySlotsEditor
              value={daySlots}
              setValue={setDaySlots}
              onCancel={() => setEditState(false)}
              onSave={saveSlots}
            />
          ) : (
            <>
              <div className="flex gap-2 flex-wrap min-h-[32px]">
                {daySlots.length === 0 ? (
                  <div className="text-gray-500">No times set</div>
                ) : (
                  daySlots.map(t => (
                    <span
                      key={t}
                      className="inline-block px-3 py-1 rounded bg-primary text-white text-sm mr-1"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
              <button
                className="mt-4 bg-accent px-4 py-1 rounded text-white font-semibold"
                onClick={() => setEditState(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Utility times for schedule selection (every 30 minutes between 8am - 6pm)
const defaultTimes = [
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00"
];

function DaySlotsEditor({
  value,
  setValue,
  onCancel,
  onSave,
}: {
  value: string[];
  setValue: (_: string[]) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  function toggleTime(t: string) {
    setValue(value.includes(t) ? value.filter(x => x !== t) : [...value, t]);
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {defaultTimes.map(t => (
          <button
            key={t}
            type="button"
            className={`px-3 py-1 rounded border ${
              value.includes(t)
                ? "bg-accent text-white border-accent"
                : "bg-white text-primary border-primary"
            }`}
            onClick={() => toggleTime(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          className="bg-primary text-white px-5 py-2 rounded font-bold"
          type="button"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="bg-gray-100 border border-accent px-5 py-2 rounded font-bold text-accent"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
