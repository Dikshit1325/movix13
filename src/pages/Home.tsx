import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

export default function Home() {
  const trending = movies.filter((m) => m.trending);
  const upcoming = movies.filter((m) => m.upcoming);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroBg} alt="Hero" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
        </motion.div>

        <div className="container relative z-10 px-4 flex flex-col items-start pt-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 w-max"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium tracking-wide">Premium Cinema Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter font-black mb-6 drop-shadow-2xl max-w-4xl leading-tight"
          >
            FEEL THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">MAGIC</span> OF MOVIES.
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-lg md:text-2xl max-w-2xl mb-10 font-light"
          >
            Book your favourite movies in seconds. Premium seats, best theatres, unforgettable experiences await you.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4"
          >
            <Link
              to="/movies"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,50,50,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Play className="h-5 w-5 relative z-10 fill-current" /> 
              <span className="relative z-10">Now Showing</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
              Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Now</span>
            </h2>
            <p className="text-white/60">The most watched movies this week</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
              <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
              <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div ref={carouselRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 pt-4 snap-x snap-mandatory px-4 -mx-4 md:px-0 md:mx-0">
            {trending.map((movie, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={movie.id} 
                className="min-w-[260px] md:min-w-[300px] snap-start"
              >
                <MovieCard movie={movie} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="container mx-auto px-4 pb-32">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Soon</span>
          </h2>
          <p className="text-white/60">Mark your calendars for these upcoming blockbusters</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcoming.map((movie, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={movie.id}
            >
              <MovieCard movie={movie} index={i} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
