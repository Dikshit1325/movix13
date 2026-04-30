import { Armchair, Clock, Hash, MapPin } from "lucide-react";
import { Booking } from "@/context/BookingContext";

export default function BookingCard({ booking }: { booking: Booking }) {
  const bookedOn = new Date(booking.bookedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ticket-card animate-fade-in-up rounded-xl p-5">
      <div className="flex gap-4">
        <img src={booking.movie.poster} alt={booking.movie.title} className="h-36 w-24 flex-shrink-0 rounded-lg object-cover" />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="truncate font-display text-xl tracking-wide text-foreground">{booking.movie.title}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              <span className="truncate">{booking.theatre.name}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {bookedOn} | {booking.showTime}
            </p>
            <p className="flex items-center gap-2">
              <Armchair className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {booking.seats.join(", ")}
            </p>
            <p className="flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              <span className="font-mono text-xs">{booking.bookingCode}</span>
            </p>
          </div>
          <p className="text-lg font-bold text-primary">Rs. {booking.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
