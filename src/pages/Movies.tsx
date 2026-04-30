import { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { genres, movieLanguages, movies } from "@/data/movies";

export default function Movies() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = activeGenre === "All" ? movies : movies.filter((movie) => movie.genre === activeGenre);

  return (
    <div className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="mb-2 font-display text-4xl tracking-wide md:text-5xl">
          All <span className="text-gradient">Movies</span>
        </h1>
        <p className="mb-8 text-muted-foreground">Choose a movie, filter by genre, and browse dedicated language collections.</p>

        <div className="mb-10 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`ripple rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeGenre === genre
                  ? "bg-primary text-primary-foreground glow-btn"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl tracking-wide text-foreground">Now Showing</h2>
              <p className="text-sm text-muted-foreground">
                {activeGenre === "All" ? "Every available title" : `${activeGenre} movies currently available`}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">{filtered.length} titles</span>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>

          {filtered.length === 0 && <p className="py-20 text-center text-muted-foreground">No movies found for this genre.</p>}
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="font-display text-3xl tracking-wide text-foreground">
              Browse by <span className="text-gradient">Language</span>
            </h2>
            <p className="text-muted-foreground">Explore Punjabi, Hindi, English, and other language collections side by side.</p>
          </div>

          <div className="space-y-12">
            {movieLanguages.map((language) => {
              const languageMovies = movies.filter((movie) => movie.language === language);

              return (
                <div key={language}>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-foreground">{language} Movies</h3>
                      <p className="text-sm text-muted-foreground">Hand-picked titles in {language}.</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{languageMovies.length} titles</span>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {languageMovies.map((movie, index) => (
                      <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
