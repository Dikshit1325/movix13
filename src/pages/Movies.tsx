import { useState } from "react";
import { movies, genres } from "@/data/movies";
import MovieCard from "@/components/MovieCard";

export default function Movies() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = activeGenre === "All" ? movies : movies.filter((m) => m.genre === activeGenre);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-2">
          All <span className="text-gradient">Movies</span>
        </h1>
        <p className="text-muted-foreground mb-8">Choose a movie and book your tickets</p>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ripple ${
                activeGenre === genre
                  ? "bg-primary text-primary-foreground glow-btn"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No movies found for this genre.</p>
        )}
      </div>
    </div>
  );
}
