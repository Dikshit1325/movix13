import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { generateSeatLayout } from "@/data/theatres";
import SeatLayoutComponent from "@/components/SeatLayout";

export default function SeatSelection() {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheatre, selectedShowTime, setSelectedSeats } = useBooking();
  const seats = useMemo(() => generateSeatLayout(), []);
  const [localSeats, setLocalSeats] = useState<string[]>([]);

  if (!selectedMovie || !selectedTheatre) {
    return (
      <div className="min-h-screen pt-24 text-center text-muted-foreground">
        <p>Please select a movie and theatre first.</p>
      </div>
    );
  }

  const toggleSeat = (id: string) => {
    setLocalSeats((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const total = localSeats.length * selectedTheatre.pricePerSeat;

  const handleProceed = () => {
    setSelectedSeats(localSeats);
    navigate("/booking-summary");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl tracking-wide mb-2 text-center">
          Select <span className="text-gradient">Your Seats</span>
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-2">
          {selectedMovie.title} • {selectedTheatre.name} • {selectedShowTime}
        </p>

        <div className="glass-card rounded-2xl p-6 md:p-8 mt-8">
          <SeatLayoutComponent seats={seats} selectedSeats={localSeats} onToggleSeat={toggleSeat} />
        </div>

        {/* Summary bar */}
        <div className="mt-8 glass-card rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div className="text-sm text-muted-foreground">
            {localSeats.length > 0 ? (
              <>
                <span className="text-foreground font-semibold">{localSeats.length}</span> seat(s) selected:{" "}
                <span className="text-primary font-medium">{localSeats.join(", ")}</span>
              </>
            ) : (
              "Tap on available seats to select"
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-primary">₹{total}</span>
            <button
              onClick={handleProceed}
              disabled={localSeats.length === 0}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-btn ripple disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
