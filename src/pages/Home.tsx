import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Star, Flame, Ticket, Sparkles } from "lucide-react";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import heroBg from "@/assets/hero-bg.jpg";
import { motion, AnimatePresence } from "framer-motion";

const MOODS = ["All", "Mind Bending", "Action Packed", "Dark Thriller", "Feel Good", "Weekend Chill"];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState("All");
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMood === "All") {
      setDisplayedMovies(movies);
    } else {
      // Fake mood filtering by shuffling or filtering based on random attributes since we don't have real mood data
      // We will just filter randomly for the sake of the futuristic UI demonstration
      const filtered = [...movies].sort(() => Math.random() - 0.5).slice(0, 4);
      setDisplayedMovies(filtered);
    }
  }, [selectedMood]);

  const trending = movies.filter((m) => m.trending);
  const upcoming = movies.filter((m) => m.upcoming);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Animated Trailer-like background effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity filter blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 holographic-bg opacity-30 mix-blend-screen" />
        </motion.div>

        <div className="container relative z-10 px-4 flex flex-col items-start pt-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6 glass-card px-4 py-1.5 rounded-full cyber-border w-max"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase">
              Next-Gen Cinema
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter font-black mb-6 drop-shadow-2xl max-w-5xl leading-[0.9]"
          >
            ENTER THE <br />
            <span className="glow-text">MULTIVERSE</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-lg md:text-2xl max-w-2xl mb-10 font-light backdrop-blur-sm"
          >
            Immersive 4DX. Dolby Atmos. Holographic displays. Secure your coordinates in the ultimate cinematic dimension.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4"
          >
            <Link
              to="/movies"
              className="glow-btn group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[scanline_1.5s_ease-in-out_infinite]" />
              <Ticket className="h-5 w-5 relative z-10" /> 
              <span className="relative z-10">Book Portal</span>
            </Link>
            
            <button
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-lg transition-all hover:bg-white/10 hover:border-primary/50"
            >
              <Play className="h-5 w-5 text-primary group-hover:animate-pulse" /> 
              <span>Watch Trailer</span>
            </button>
          </motion.div>
        </div>

        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* AI Recommendation Section */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4 text-accent"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-display font-bold tracking-widest uppercase text-sm">AI Engine Active</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-8"
          >
            WHAT'S YOUR <span className="glow-text">VIBE?</span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                  selectedMood === mood 
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {displayedMovies.map((movie, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={movie.id}
              >
                <MovieCard movie={movie} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Trending & Hype */}
      <section className="bg-gradient-to-b from-background to-card border-y border-white/5 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Hype <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Radar</span>
              </h2>
              <p className="text-white/60">Real-time global cinema statistics</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll("left")} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all group">
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
              </button>
              <button onClick={() => scroll("right")} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all group">
                <ChevronRight className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
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
                  className="min-w-[280px] md:min-w-[320px] snap-start relative"
                >
                  {/* Fake Stats Overlay */}
                  <div className="absolute -top-4 -right-4 z-20 glass-card px-3 py-1.5 rounded-xl border border-orange-500/30 flex items-center gap-1.5 text-xs font-bold text-orange-400 shadow-[0_0_15px_rgba(255,100,0,0.3)] animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-orange-400" />
                    9{Math.floor(Math.random() * 9)}% HYPE
                  </div>
                  <MovieCard movie={movie} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Initiating <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-500">Soon</span>
          </h2>
          <p className="text-white/60">Incoming transmissions to theaters near you</p>
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
