import { Link } from "react-router-dom";
import { Star, Clock, Tag } from "lucide-react";
import { Movie } from "@/data/movies";

export default function MovieCard({ movie, index = 0 }: { movie: Movie; index?: number }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card-hover glass-card rounded-xl overflow-hidden group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Star className="h-3.5 w-3.5 text-primary fill-primary" />
          <span className="text-xs font-semibold text-foreground">{movie.rating}/10</span>
          <span className="text-xs text-muted-foreground">{movie.votes} Votes</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-lg tracking-wide text-foreground truncate">{movie.title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3" /> {movie.genre}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {movie.duration}
          </span>
        </div>
        {!movie.upcoming && (
          <div className="pt-2">
            <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground glow-btn ripple">
              Book Now
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
