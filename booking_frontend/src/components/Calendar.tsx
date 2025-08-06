import React from "react";

function getMonthDays(year: number, month: number) {
  const d = new Date(year, month, 1);
  const result = [];
  while (d.getMonth() === month) {
    result.push(new Date(d.getTime()));
    d.setDate(d.getDate() + 1);
  }
  return result;
}

type CalendarProps = {
  slots: string[];
  selected: string;
  onSelect: (date: string) => void;
};

export default function Calendar({ slots, selected, onSelect }: CalendarProps) {
  const today = new Date();
  const [month, setMonth] = React.useState(today.getMonth());
  const [year, setYear] = React.useState(today.getFullYear());

  const days = getMonthDays(year, month);

  function isAvailable(d: Date) {
    const dayStr = d.toISOString().slice(0, 10);
    return slots.includes(dayStr);
  }
  function isSelected(d: Date) {
    return selected === d.toISOString().slice(0, 10);
  }

  return (
    <div className="bg-secondary rounded p-4">
      <div className="flex justify-between mb-2">
        <button
          onClick={() =>
            setMonth(m => (m === 0 ? 11 : m - 1)) ||
            (m === 0 && setYear(y => y - 1))
          }
          className="px-2 text-primary hover:text-accent"
        >
          ←
        </button>
        <span className="font-semibold text-primary">{`${today.toLocaleString(
          "default",
          { month: "long" }
        )} ${year}`}</span>
        <button
          onClick={() =>
            setMonth(m => (m === 11 ? 0 : m + 1)) ||
            (m === 11 && setYear(y => y + 1))
          }
          className="px-2 text-primary hover:text-accent"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs mb-1 font-semibold">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(days[0].getDay())].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(d => (
          <button
            key={d.toISOString()}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition border-2 ${
              isAvailable(d)
                ? isSelected(d)
                  ? "bg-accent text-white border-primary"
                  : "bg-white border-accent text-primary hover:bg-accent hover:text-white"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            disabled={!isAvailable(d)}
            onClick={() => onSelect(d.toISOString().slice(0, 10))}
            type="button"
          >
            {d.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
