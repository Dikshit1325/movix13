import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { Check, MapPin, Clock, Armchair, Film } from "lucide-react";

export default function BookingSummary() {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheatre, selectedShowTime, selectedSeats, confirmBooking } = useBooking();
  const [confirmed, setConfirmed] = useState(false);

  if (!selectedMovie || !selectedTheatre || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen pt-24 text-center text-muted-foreground">
        <p>No booking in progress. Start by selecting a movie.</p>
      </div>
    );
  }

  const total = selectedSeats.length * selectedTheatre.pricePerSeat;

  const handleConfirm = () => {
    confirmBooking();
    setConfirmed(true);
    setTimeout(() => navigate("/my-bookings"), 2500);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center animate-pulse-glow">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl text-foreground">Booking Confirmed!</h2>
          <p className="text-muted-foreground">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-center">
          Booking <span className="text-gradient">Summary</span>
        </h1>

        <div className="glass-card rounded-2xl overflow-hidden">
          <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full h-48 object-cover" />
          <div className="p-6 space-y-4">
            <h2 className="font-display text-2xl text-foreground">{selectedMovie.title}</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Film className="h-4 w-4 text-primary" /> {selectedMovie.genre} • {selectedMovie.duration}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {selectedTheatre.name}</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {selectedShowTime}</p>
              <p className="flex items-center gap-2"><Armchair className="h-4 w-4 text-primary" /> {selectedSeats.join(", ")}</p>
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{selectedSeats.length} × ₹{selectedTheatre.pricePerSeat}</span>
              <span className="text-2xl font-bold text-primary">₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold glow-btn ripple text-sm"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
