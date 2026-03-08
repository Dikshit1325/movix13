import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import heroBg from "@/assets/hero-bg.jpg";

export default function Home() {
  const trending = movies.filter((m) => m.trending);
  const upcoming = movies.filter((m) => m.upcoming);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div
          className={`relative z-10 text-center px-4 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="font-display text-5xl md:text-8xl tracking-wider mb-4">
            <span className="text-foreground">YOUR </span>
            <span className="text-gradient">CINEMA</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8">
            Book your favourite movies in seconds. Premium seats, best theatres, unforgettable experiences.
          </p>
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm glow-btn ripple"
          >
            <Play className="h-4 w-4" /> Browse Movies
          </Link>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
          <span className="text-gradient">Trending</span> Now
        </h2>
        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div ref={carouselRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
            {trending.map((movie, i) => (
              <div key={movie.id} className="min-w-[220px] max-w-[220px] snap-start">
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Upcoming */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8">
          Coming <span className="text-gradient">Soon</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {upcoming.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
