import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair, Check, Clock, Film, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { toast } from "@/hooks/use-toast";

export default function BookingSummary() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { confirmBooking, isSubmittingBooking, selectedMovie, selectedSeats, selectedShowTime, selectedTheatre } = useBooking();
  const [confirmed, setConfirmed] = useState(false);

  if (!selectedMovie || !selectedTheatre || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen pt-24 text-center text-muted-foreground">
        <p>No booking in progress. Start by selecting a movie.</p>
      </div>
    );
  }

  const total = selectedSeats.length * selectedTheatre.pricePerSeat;

  const handleConfirm = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in so we can save this booking to your account.",
      });
      navigate("/sign-in?redirect=/booking-summary");
      return;
    }

    try {
      await confirmBooking();
      setConfirmed(true);
      setTimeout(() => navigate("/my-bookings"), 2500);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "We could not confirm your booking.",
        variant: "destructive",
      });
    }
  };

  if (confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-fade-in-up space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary animate-pulse-glow">
            <Check className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl text-foreground">Booking Confirmed!</h2>
          <p className="text-muted-foreground">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto max-w-lg px-4">
        <h1 className="mb-8 text-center font-display text-3xl tracking-wide md:text-4xl">
          Booking <span className="text-gradient">Summary</span>
        </h1>

        <div className="glass-card overflow-hidden rounded-2xl">
          <img src={selectedMovie.poster} alt={selectedMovie.title} className="h-48 w-full object-cover" />
          <div className="space-y-4 p-6">
            <h2 className="font-display text-2xl text-foreground">{selectedMovie.title}</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Film className="h-4 w-4 text-primary" /> {selectedMovie.genre} | {selectedMovie.language} | {selectedMovie.duration}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {selectedTheatre.name}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> {selectedShowTime}
              </p>
              <p className="flex items-center gap-2">
                <Armchair className="h-4 w-4 text-primary" /> {selectedSeats.join(", ")}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                {selectedSeats.length} x Rs. {selectedTheatre.pricePerSeat}
              </span>
              <span className="text-2xl font-bold text-primary">Rs. {total}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmittingBooking}
              className="ripple w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground glow-btn disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmittingBooking ? "Saving Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
