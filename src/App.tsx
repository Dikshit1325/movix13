import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CinemaNavbar from "@/components/CinemaNavbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import Account from "./pages/Account";
import BookingSummary from "./pages/BookingSummary";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import SeatSelection from "./pages/SeatSelection";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <CinemaNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/booking-summary" element={<BookingSummary />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
