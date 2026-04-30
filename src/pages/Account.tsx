import { Link } from "react-router-dom";
import { CalendarDays, CreditCard, Languages, Ticket, UserCircle2 } from "lucide-react";
import BookingCard from "@/components/BookingCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Account() {
  const { isLoading, logout, user } = useAuth();
  const { bookings, isLoadingBookings } = useBooking();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 text-center text-muted-foreground">Loading your account...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="glass-card rounded-3xl px-8 py-12 text-center">
            <UserCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" />
            <h1 className="mb-3 font-display text-4xl tracking-wide text-foreground">Your Account</h1>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Sign in to see your saved profile, authentication methods, and booking history in one place.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/sign-in?redirect=/account">
                <Button className="w-full rounded-full sm:w-auto">Sign In</Button>
              </Link>
              <Link to="/sign-up?redirect=/account">
                <Button variant="outline" className="w-full rounded-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalSpent = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const watchedLanguages = Array.from(new Set(bookings.map((booking) => booking.movie.language)));
  const latestBooking = bookings[0];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border border-white/10">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-xl font-semibold text-primary">
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-4xl tracking-wide text-foreground">
                My <span className="text-gradient">Account</span>
              </h1>
              <p className="mt-1 text-lg text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {user.providers.map((provider) => (
                  <Badge key={provider} variant="secondary" className="capitalize">
                    {provider}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button variant="outline" className="rounded-full" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Ticket className="h-4 w-4 text-primary" />
              Total bookings
            </div>
            <p className="text-3xl font-semibold text-foreground">{bookings.length}</p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              Total spent
            </div>
            <p className="text-3xl font-semibold text-foreground">Rs. {totalSpent}</p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Languages className="h-4 w-4 text-primary" />
              Languages watched
            </div>
            <p className="text-3xl font-semibold text-foreground">{watchedLanguages.length}</p>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              Member since
            </div>
            <p className="text-base font-semibold text-foreground">{formatDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="glass-card rounded-3xl p-6">
            <h2 className="mb-6 font-display text-2xl tracking-wide text-foreground">Account Details</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Full name</p>
                <p className="mt-1 text-lg text-foreground">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email address</p>
                <p className="mt-1 text-lg text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Primary sign-in</p>
                <p className="mt-1 text-lg capitalize text-foreground">{user.primaryProvider}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Linked methods</p>
                <p className="mt-1 text-lg capitalize text-foreground">{user.providers.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stored bookings</p>
                <p className="mt-1 text-lg text-foreground">{user.bookingsCount ?? bookings.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent languages</p>
                <p className="mt-1 text-lg text-foreground">{watchedLanguages.join(", ") || "None yet"}</p>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-3xl p-6">
            <h2 className="mb-6 font-display text-2xl tracking-wide text-foreground">Latest Activity</h2>
            {isLoadingBookings ? (
              <p className="text-muted-foreground">Loading your booking activity...</p>
            ) : latestBooking ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Most recent movie</p>
                  <p className="mt-1 text-xl text-foreground">{latestBooking.movie.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booked on</p>
                  <p className="mt-1 text-foreground">{formatDate(latestBooking.bookedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Show details</p>
                  <p className="mt-1 text-foreground">
                    {latestBooking.theatre.name} | {latestBooking.showTime} | {latestBooking.seats.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booking code</p>
                  <p className="mt-1 font-mono text-foreground">{latestBooking.bookingCode}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">You have not saved a booking yet.</p>
                <Link to="/movies">
                  <Button className="rounded-full">Browse Movies</Button>
                </Link>
              </div>
            )}
          </section>
        </div>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl tracking-wide text-foreground">Saved Bookings</h2>
              <p className="text-muted-foreground">Everything tied to your account in one place.</p>
            </div>
            <Link to="/my-bookings" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>

          {isLoadingBookings ? (
            <div className="glass-card rounded-2xl p-6 text-muted-foreground">Loading your bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="glass-card rounded-2xl p-6 text-muted-foreground">No bookings saved yet.</div>
          ) : (
            <div className="space-y-5">
              {bookings.slice(0, 3).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
