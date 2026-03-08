import { Seat } from "@/data/theatres";

interface Props {
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (id: string) => void;
}

export default function SeatLayout({ seats, selectedSeats, onToggleSeat }: Props) {
  const rows = Array.from(new Set(seats.map((s) => s.row)));

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="screen-curve h-3 w-3/4 mx-auto mb-8" />
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-4">Screen</p>

      {/* Seats */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="w-6 text-xs font-semibold text-muted-foreground text-center">{row}</span>
            {seats
              .filter((s) => s.row === row)
              .map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                const isBooked = seat.status === "booked";
                return (
                  <button
                    key={seat.id}
                    onClick={() => !isBooked && onToggleSeat(seat.id)}
                    className={`w-8 h-8 rounded-t-lg text-[10px] font-semibold transition-all duration-200 ${
                      isBooked
                        ? "seat-booked"
                        : isSelected
                        ? "seat-selected text-primary-foreground"
                        : "seat-available text-accent-foreground hover:brightness-110"
                    }`}
                    disabled={isBooked}
                    title={seat.id}
                  >
                    {seat.number}
                  </button>
                );
              })}
            <span className="w-6 text-xs font-semibold text-muted-foreground text-center">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4">
        {[
          { label: "Available", cls: "seat-available" },
          { label: "Selected", cls: "seat-selected" },
          { label: "Booked", cls: "seat-booked" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-t-md ${item.cls}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
