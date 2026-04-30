import { Link } from "react-router-dom";
import { Clock, Star, Tag } from "lucide-react";
import { Movie } from "@/data/movies";

export default function MovieCard({ movie, index = 0 }: { movie: Movie; index?: number }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card-hover glass-card group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-md">
          {movie.language}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 shadow-lg backdrop-blur-md">
          <Star className="h-4 w-4 fill-primary text-primary drop-shadow-[0_0_5px_rgba(255,50,50,0.8)]" />
          <span className="text-xs font-bold text-white">{movie.rating}/10</span>
          <span className="border-l border-white/20 pl-1 text-xs text-white/60">{movie.votes} Votes</span>
        </div>
      </div>

      <div className="relative space-y-3 p-5">
        <h3 className="min-h-[3.5rem] font-display text-xl font-bold tracking-wide text-white">{movie.title}</h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
          <span className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/5 px-2 py-1">
            <Tag className="h-3.5 w-3.5 text-primary" /> {movie.genre}
          </span>
          <span className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/5 px-2 py-1">
            <Clock className="h-3.5 w-3.5 text-primary" /> {movie.duration}
          </span>
        </div>
        {!movie.upcoming && (
          <div className="pt-3">
            <span className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(255,50,50,0.3)] glow-btn">
              Book Now
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
