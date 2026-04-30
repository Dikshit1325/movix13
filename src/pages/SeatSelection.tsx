import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeatLayoutComponent from "@/components/SeatLayout";
import { useBooking } from "@/context/BookingContext";
import { generateSeatLayout } from "@/data/theatres";

export default function SeatSelection() {
  const navigate = useNavigate();
  const { selectedMovie, selectedShowTime, selectedTheatre, setSelectedSeats } = useBooking();
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
    setLocalSeats((current) => (current.includes(id) ? current.filter((seat) => seat !== id) : [...current, id]));
  };

  const total = localSeats.length * selectedTheatre.pricePerSeat;

  const handleProceed = () => {
    setSelectedSeats(localSeats);
    navigate("/booking-summary");
  };

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-center font-display text-3xl tracking-wide md:text-4xl">
          Select <span className="text-gradient">Your Seats</span>
        </h1>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {selectedMovie.title} | {selectedTheatre.name} | {selectedShowTime}
        </p>

        <div className="glass-card mt-8 rounded-2xl p-6 md:p-8">
          <SeatLayoutComponent seats={seats} selectedSeats={localSeats} onToggleSeat={toggleSeat} />
        </div>

        <div className="glass-card animate-fade-in-up mt-8 flex flex-col items-center justify-between gap-4 rounded-xl p-5 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            {localSeats.length > 0 ? (
              <>
                <span className="font-semibold text-foreground">{localSeats.length}</span> seat(s) selected:{" "}
                <span className="font-medium text-primary">{localSeats.join(", ")}</span>
              </>
            ) : (
              "Tap on available seats to select"
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-primary">Rs. {total}</span>
            <button
              onClick={handleProceed}
              disabled={localSeats.length === 0}
              className="ripple rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground glow-btn disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
