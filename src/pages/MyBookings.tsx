import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";
import BookingCard from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, isLoadingBookings } = useBooking();

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-8 font-display text-4xl tracking-wide">
          My <span className="text-gradient">Bookings</span>
        </h1>

        {!user ? (
          <div className="space-y-4 py-20 text-center">
            <Ticket className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Sign in to view your saved bookings.</p>
            <Link to="/sign-in?redirect=/my-bookings">
              <Button className="rounded-full">Sign In</Button>
            </Link>
          </div>
        ) : isLoadingBookings ? (
          <div className="py-20 text-center text-muted-foreground">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="space-y-4 py-20 text-center">
            <Ticket className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No bookings yet</p>
            <Link to="/movies" className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground glow-btn ripple">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
