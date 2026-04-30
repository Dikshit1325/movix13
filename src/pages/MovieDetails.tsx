import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Languages, Star, Tag, Users } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedShowTime, setSelectedTheatre } = useBooking();
  const movie = movies.find((entry) => entry.id === Number(id));

  const [chosenTheatre, setChosenTheatre] = useState<number | null>(null);
  const [chosenTime, setChosenTime] = useState("");

  if (!movie) {
    return <div className="min-h-screen pt-24 text-center text-muted-foreground">Movie not found.</div>;
  }

  const handleSelectSeats = () => {
    const theatre = theatres.find((entry) => entry.id === chosenTheatre);
    if (!theatre || !chosenTime) return;

    setSelectedMovie(movie);
    setSelectedTheatre(theatre);
    setSelectedShowTime(chosenTime);
    navigate("/seat-selection");
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="relative h-[50vh] overflow-hidden">
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto -mt-32 px-4 pb-20">
        <div className="flex flex-col gap-8 md:flex-row">
          <img src={movie.poster} alt={movie.title} className="h-72 w-48 flex-shrink-0 rounded-xl border-2 border-border object-cover shadow-2xl" />
          <div className="flex-1 space-y-4">
            <h1 className="font-display text-4xl tracking-wide text-foreground md:text-5xl">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" /> {movie.rating}/10
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {movie.duration}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> {movie.genre}
              </span>
              <span className="flex items-center gap-1">
                <Languages className="h-4 w-4" /> {movie.language}
              </span>
            </div>
            <p className="max-w-2xl leading-relaxed text-secondary-foreground">{movie.description}</p>
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" /> Cast
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor) => (
                  <span key={actor} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="font-display text-2xl tracking-wide text-foreground">
            Select <span className="text-gradient">Theatre & Showtime</span>
          </h2>
          <div className="grid gap-4">
            {theatres.map((theatre) => (
              <div
                key={theatre.id}
                className={`glass-card cursor-pointer rounded-xl p-5 transition-all duration-300 ${
                  chosenTheatre === theatre.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
                }`}
                onClick={() => {
                  setChosenTheatre(theatre.id);
                  setChosenTime("");
                }}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{theatre.name}</h3>
                    <p className="text-xs text-muted-foreground">{theatre.location}</p>
                    <p className="mt-1 text-xs text-primary">Rs. {theatre.pricePerSeat} / seat</p>
                  </div>

                  {chosenTheatre === theatre.id && (
                    <div className="animate-fade-in-up flex flex-wrap gap-2">
                      {theatre.showTimings.map((time) => (
                        <button
                          key={time}
                          onClick={(e) => {
                            e.stopPropagation();
                            setChosenTime(time);
                          }}
                          className={`ripple rounded-lg px-4 py-2 text-xs font-medium transition-all ${
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
              className="ripple mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground glow-btn animate-fade-in-up"
            >
              Select Seats
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
