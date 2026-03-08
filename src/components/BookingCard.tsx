import { Booking } from "@/context/BookingContext";
import { MapPin, Clock, Armchair, Hash } from "lucide-react";

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="ticket-card rounded-xl p-5 animate-fade-in-up">
      <div className="flex gap-4">
        <img
          src={booking.movie.poster}
          alt={booking.movie.title}
          className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 space-y-2 min-w-0">
          <h3 className="font-display text-xl tracking-wide text-foreground truncate">{booking.movie.title}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span className="truncate">{booking.theatre.name}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              {booking.date} • {booking.showTime}
            </p>
            <p className="flex items-center gap-2">
              <Armchair className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              {booking.seats.join(", ")}
            </p>
            <p className="flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span className="font-mono text-xs">{booking.id}</span>
            </p>
          </div>
          <p className="text-lg font-bold text-primary">₹{booking.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
