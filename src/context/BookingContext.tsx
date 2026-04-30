import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Movie } from "@/data/movies";
import { Theatre } from "@/data/theatres";
import { apiRequest } from "@/lib/api";

export interface Booking {
  id: string;
  bookingCode: string;
  movie: Movie;
  theatre: Theatre;
  showTime: string;
  seats: string[];
  totalPrice: number;
  bookedAt: string;
  createdAt: string;
}

interface BookingState {
  selectedMovie: Movie | null;
  selectedTheatre: Theatre | null;
  selectedShowTime: string;
  selectedSeats: string[];
  bookings: Booking[];
  isLoadingBookings: boolean;
  isSubmittingBooking: boolean;
  setSelectedMovie: (movie: Movie | null) => void;
  setSelectedTheatre: (theatre: Theatre | null) => void;
  setSelectedShowTime: (showTime: string) => void;
  setSelectedSeats: (seats: string[]) => void;
  confirmBooking: () => Promise<Booking>;
  refreshBookings: () => Promise<void>;
  clearSelection: () => void;
}

const BookingContext = createContext<BookingState | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const clearSelection = useCallback(() => {
    setSelectedMovie(null);
    setSelectedTheatre(null);
    setSelectedShowTime("");
    setSelectedSeats([]);
  }, []);

  const refreshBookings = useCallback(async () => {
    if (!token) {
      setBookings([]);
      return;
    }

    setIsLoadingBookings(true);
    try {
      const response = await apiRequest<{ bookings: Booking[] }>("/bookings", {
        token,
      });
      setBookings(response.bookings);
    } finally {
      setIsLoadingBookings(false);
    }
  }, [token]);

  useEffect(() => {
    void refreshBookings();
  }, [refreshBookings]);

  const confirmBooking = useCallback(async () => {
    if (!selectedMovie || !selectedTheatre || !selectedShowTime || selectedSeats.length === 0) {
      throw new Error("Please complete your movie, theatre, showtime, and seat selection first.");
    }

    if (!token) {
      throw new Error("Please sign in to save your booking.");
    }

    setIsSubmittingBooking(true);
    try {
      const response = await apiRequest<{ booking: Booking }>("/bookings", {
        method: "POST",
        token,
        body: {
          movie: selectedMovie,
          theatre: selectedTheatre,
          showTime: selectedShowTime,
          seats: selectedSeats,
          totalPrice: selectedSeats.length * selectedTheatre.pricePerSeat,
        },
      });

      setBookings((current) => [response.booking, ...current]);
      clearSelection();
      return response.booking;
    } finally {
      setIsSubmittingBooking(false);
    }
  }, [clearSelection, selectedMovie, selectedSeats, selectedShowTime, selectedTheatre, token]);

  const value = useMemo(
    () => ({
      selectedMovie,
      selectedTheatre,
      selectedShowTime,
      selectedSeats,
      bookings,
      isLoadingBookings,
      isSubmittingBooking,
      setSelectedMovie,
      setSelectedTheatre,
      setSelectedShowTime,
      setSelectedSeats,
      confirmBooking,
      refreshBookings,
      clearSelection,
    }),
    [
      bookings,
      clearSelection,
      confirmBooking,
      isLoadingBookings,
      isSubmittingBooking,
      refreshBookings,
      selectedMovie,
      selectedSeats,
      selectedShowTime,
      selectedTheatre,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
