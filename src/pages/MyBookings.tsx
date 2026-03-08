import { useBooking } from "@/context/BookingContext";
import BookingCard from "@/components/BookingCard";
import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

export default function MyBookings() {
  const { bookings } = useBooking();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-4xl tracking-wide mb-8">
          My <span className="text-gradient">Bookings</span>
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Ticket className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No bookings yet</p>
            <Link
              to="/movies"
              className="inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold glow-btn ripple"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
