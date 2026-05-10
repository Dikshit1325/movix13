import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Languages, Star, Tag, Users, ShieldAlert, Sparkles, MapPin } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedShowTime, setSelectedTheatre } = useBooking();
  const movie = movies.find((entry) => entry.id === Number(id));

  const [chosenTheatre, setChosenTheatre] = useState<number | null>(null);
  const [chosenTime, setChosenTime] = useState("");

  if (!movie) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4 animate-pulse" />
        <h1 className="font-display text-4xl font-bold tracking-widest text-white mb-2">404</h1>
        <div className="text-white/50 tracking-wider">Movie coordinates not found in the database.</div>
      </div>
    );
  }

  const handleSelectSeats = () => {
    const theatre = theatres.find((entry) => entry.id === chosenTheatre);
    if (!theatre || !chosenTime) return;

    setSelectedMovie(movie);
    setSelectedTheatre(theatre);
    setSelectedShowTime(chosenTime);
    navigate("/seat-selection");
  };

  // Dynamic Genre Ambient Glow
  const getGenreGlow = (genre: string) => {
    const g = genre.toLowerCase();
    if (g.includes("horror") || g.includes("thriller")) return "from-red-500/40 via-red-900/10";
    if (g.includes("sci-fi") || g.includes("mind bending")) return "from-blue-500/40 via-cyan-900/10";
    if (g.includes("action")) return "from-orange-500/40 via-red-900/10";
    if (g.includes("romance") || g.includes("drama")) return "from-pink-500/40 via-purple-900/10";
    if (g.includes("comedy") || g.includes("feel good")) return "from-yellow-500/40 via-orange-900/10";
    return "from-primary/40 via-secondary/10";
  };

  const getGenreShadow = (genre: string) => {
    const g = genre.toLowerCase();
    if (g.includes("horror") || g.includes("thriller")) return "shadow-[0_0_50px_rgba(239,68,68,0.3)]";
    if (g.includes("sci-fi")) return "shadow-[0_0_50px_rgba(59,130,246,0.3)]";
    if (g.includes("action")) return "shadow-[0_0_50px_rgba(249,115,22,0.3)]";
    if (g.includes("romance")) return "shadow-[0_0_50px_rgba(236,72,153,0.3)]";
    return "shadow-[0_0_50px_rgba(0,240,255,0.3)]";
  };

  return (
    <div className="min-h-screen pt-20 relative bg-background">
      {/* Ambient background based on genre */}
      <div className={`absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b ${getGenreGlow(movie.genre)} to-background pointer-events-none opacity-60`} />

      <div className="relative h-[55vh] overflow-hidden">
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover filter blur-[2px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto -mt-40 px-4 pb-20">
        <div className="flex flex-col gap-8 md:flex-row items-start">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`flex-shrink-0 relative rounded-2xl overflow-hidden cyber-border ${getGenreShadow(movie.genre)}`}
          >
            <img src={movie.poster} alt={movie.title} className="h-80 w-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 space-y-5"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">{movie.genre}</span>
            </div>

            <h1 className="font-display text-5xl tracking-tight text-white md:text-7xl font-black drop-shadow-2xl">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-lg border border-white/10">
                <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" /> 
                <span className="font-bold text-white">{movie.rating}/10</span>
              </span>
              <span className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="h-4 w-4 text-primary" /> {movie.duration}
              </span>
              <span className="flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-lg border border-white/10">
                <Languages className="h-4 w-4 text-secondary" /> {movie.language}
              </span>
            </div>

            <p className="max-w-3xl leading-relaxed text-white/80 text-lg font-light tracking-wide">{movie.description}</p>
            
            <div className="pt-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
                <Users className="h-4 w-4 text-primary" /> Cast Overview
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor) => (
                  <span key={actor} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white/10 hover:border-primary/50">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
            <h2 className="font-display text-3xl tracking-wide text-white">
              Initialize <span className="glow-text">Sequence</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {theatres.map((theatre, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                key={theatre.id}
                className={`glass-card cursor-pointer rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group ${
                  chosenTheatre === theatre.id ? "border-primary shadow-[0_0_20px_rgba(0,240,255,0.2)] bg-primary/5" : "hover:border-white/20"
                }`}
                onClick={() => {
                  setChosenTheatre(theatre.id);
                  setChosenTime("");
                }}
              >
                {chosenTheatre === theatre.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                )}

                <div className="flex flex-col gap-4 relative z-10">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">{theatre.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-white/50 mt-1 uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {theatre.location}
                    </p>
                    <p className="mt-3 text-sm font-bold text-accent bg-accent/10 w-max px-2 py-1 rounded border border-accent/20">
                      Rs. {theatre.pricePerSeat} / seat
                    </p>
                  </div>

                  <AnimatePresence>
                    {chosenTheatre === theatre.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2 pt-2"
                      >
                        {theatre.showTimings.map((time) => (
                          <button
                            key={time}
                            onClick={(e) => {
                              e.stopPropagation();
                              setChosenTime(time);
                            }}
                            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                              chosenTime === time
                                ? "bg-primary text-white shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-105"
                                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {chosenTheatre && chosenTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6 flex justify-center md:justify-start"
              >
                <button
                  onClick={handleSelectSeats}
                  className="glow-btn group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg overflow-hidden transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[scanline_1.5s_ease-in-out_infinite]" />
                  <span className="relative z-10">Proceed to Coordinates</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
