import { Link } from "react-router-dom";
import { Clock, Star, Tag, Play, Activity, Ticket } from "lucide-react";
import { Movie } from "@/data/movies";

export default function MovieCard({ movie, index = 0 }: { movie: Movie; index?: number }) {
  // Generate a random popularity percentage for demo purposes based on votes
  const popularity = Math.min(100, Math.max(40, (parseInt(movie.votes.replace(/,/g, '')) / 10000) * 100));

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card-hover glass-card group relative block overflow-hidden rounded-2xl cyber-border"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-black/50">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="poster-overlay absolute inset-0 transition-colors duration-500" />
        
        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <div className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary backdrop-blur-md shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            {movie.language}
          </div>
          {movie.rating >= 8.5 && (
            <div className="rounded-full border border-accent/50 bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent backdrop-blur-md shadow-[0_0_10px_rgba(255,0,128,0.3)]">
              Must Watch
            </div>
          )}
        </div>

        {/* Quick Trailer Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/80 text-white shadow-[0_0_30px_rgba(0,240,255,0.6)] backdrop-blur-md hover:scale-110 hover:bg-primary transition-all">
            <Play className="h-6 w-6 fill-current ml-1" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
            <span className="text-xs font-bold text-white">{movie.rating}/10</span>
          </div>
          
          <div className="text-[10px] text-white/50 font-medium tracking-wider">
            {movie.votes} VOTES
          </div>
        </div>
      </div>

      <div className="relative space-y-4 p-5 z-10 bg-gradient-to-b from-transparent to-background/90">
        <h3 className="min-h-[3.5rem] font-display text-xl font-bold tracking-wide text-white group-hover:text-primary transition-colors line-clamp-2">
          {movie.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 font-medium">
          <span className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-accent" /> {movie.genre}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-secondary" /> {movie.duration}
          </span>
        </div>

        {/* Popularity Meter */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between items-center text-[10px] text-white/50 font-bold tracking-wider uppercase">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-primary" /> System Load</span>
            <span>{popularity.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-secondary via-primary to-accent rounded-full relative"
              style={{ width: `${popularity}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>

        {!movie.upcoming && (
          <div className="pt-2 opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/20 py-2.5 text-sm font-bold text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:bg-primary hover:text-white transition-colors">
              <Ticket className="w-4 h-4" /> Initialize Booking
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
