import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Tag, Users } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedTheatre, setSelectedShowTime } = useBooking();
  const movie = movies.find((m) => m.id === Number(id));

  const [chosenTheatre, setChosenTheatre] = useState<number | null>(null);
  const [chosenTime, setChosenTime] = useState("");

  if (!movie) return <div className="min-h-screen pt-24 text-center text-muted-foreground">Movie not found</div>;

  const handleSelectSeats = () => {
    const theatre = theatres.find((t) => t.id === chosenTheatre);
    if (!theatre || !chosenTime) return;
    setSelectedMovie(movie);
    setSelectedTheatre(theatre);
    setSelectedShowTime(chosenTime);
    navigate("/seat-selection");
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Banner */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={movie.poster} alt={movie.title} className="w-48 h-72 object-cover rounded-xl shadow-2xl flex-shrink-0 border-2 border-border" />
          <div className="flex-1 space-y-4">
            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-cinema-gold fill-cinema-gold" /> {movie.rating}/5</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {movie.duration}</span>
              <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> {movie.genre}</span>
            </div>
            <p className="text-secondary-foreground leading-relaxed max-w-2xl">{movie.description}</p>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2"><Users className="h-4 w-4 text-primary" /> Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theatres */}
        <div className="mt-12 space-y-6">
          <h2 className="font-display text-2xl tracking-wide text-foreground">Select <span className="text-gradient">Theatre & Showtime</span></h2>
          <div className="grid gap-4">
            {theatres.map((theatre) => (
              <div
                key={theatre.id}
                className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  chosenTheatre === theatre.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
                }`}
                onClick={() => { setChosenTheatre(theatre.id); setChosenTime(""); }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{theatre.name}</h3>
                    <p className="text-xs text-muted-foreground">{theatre.location}</p>
                    <p className="text-xs text-primary mt-1">₹{theatre.pricePerSeat} / seat</p>
                  </div>
                  {chosenTheatre === theatre.id && (
                    <div className="flex flex-wrap gap-2 animate-fade-in-up">
                      {theatre.showTimings.map((time) => (
                        <button
                          key={time}
                          onClick={(e) => { e.stopPropagation(); setChosenTime(time); }}
                          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ripple ${
                            chosenTime === time
                              ? "bg-primary text-primary-foreground glow-btn"
                              : "bg-secondary text-secondary-foreground hover:bg-muted"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {chosenTheatre && chosenTime && (
            <button
              onClick={handleSelectSeats}
              className="mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-btn ripple animate-fade-in-up"
            >
              Select Seats →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
