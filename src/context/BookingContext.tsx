import { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "@/data/movies";
import { Theatre } from "@/data/theatres";

export interface Booking {
  id: string;
  movie: Movie;
  theatre: Theatre;
  showTime: string;
  seats: string[];
  totalPrice: number;
  date: string;
}

interface BookingState {
  selectedMovie: Movie | null;
  selectedTheatre: Theatre | null;
  selectedShowTime: string;
  selectedSeats: string[];
  bookings: Booking[];
  setSelectedMovie: (m: Movie | null) => void;
  setSelectedTheatre: (t: Theatre | null) => void;
  setSelectedShowTime: (s: string) => void;
  setSelectedSeats: (s: string[]) => void;
  confirmBooking: () => void;
  clearSelection: () => void;
}

const BookingContext = createContext<BookingState | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const confirmBooking = () => {
    if (selectedMovie && selectedTheatre && selectedShowTime && selectedSeats.length > 0) {
      const booking: Booking = {
        id: `BK${Date.now().toString(36).toUpperCase()}`,
        movie: selectedMovie,
        theatre: selectedTheatre,
        showTime: selectedShowTime,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * selectedTheatre.pricePerSeat,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      };
      setBookings((prev) => [...prev, booking]);
      clearSelection();
    }
  };

  const clearSelection = () => {
    setSelectedMovie(null);
    setSelectedTheatre(null);
    setSelectedShowTime("");
    setSelectedSeats([]);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovie, selectedTheatre, selectedShowTime, selectedSeats, bookings,
        setSelectedMovie, setSelectedTheatre, setSelectedShowTime, setSelectedSeats,
        confirmBooking, clearSelection,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
