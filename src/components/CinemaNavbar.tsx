import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Menu, User, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/my-bookings", label: "My Bookings" },
  { to: "/account", label: "Account" },
];

export default function CinemaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Mock voice search duration
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className={`container mx-auto transition-all duration-500 ${scrolled ? "px-4 md:px-8" : "px-4"}`}>
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass-card rounded-2xl px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] cyber-border" : ""
        }`}>
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative rounded-xl bg-primary/20 p-2 transition-colors group-hover:bg-primary/30">
              <Film className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-xl bg-primary/40 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              MOV<span className="glow-text">IX</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}

            <div className="mx-2 h-6 w-px bg-white/10" />

            {/* Voice Search Button */}
            <button 
              onClick={toggleVoiceSearch}
              className={`relative ml-1 mr-2 rounded-full p-2.5 transition-all duration-300 ${
                isListening 
                  ? "bg-primary text-white shadow-[0_0_20px_hsl(var(--primary))]" 
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
              {isListening && (
                <span className="absolute -inset-1 animate-ping rounded-full bg-primary/40" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition-all hover:border-primary/50 hover:bg-primary/10"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span className="max-w-[120px] truncate font-medium">{user.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="rounded-full text-white/70 hover:bg-destructive/20 hover:text-destructive"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/sign-in">
                  <Button variant="ghost" className="rounded-full text-white/80 hover:bg-white/10 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="glow-btn rounded-full bg-primary text-white font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <button className="rounded-full p-2 text-white transition-colors hover:bg-white/10 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="glass-card mt-2 mx-4 flex flex-col gap-2 rounded-2xl border border-white/10 p-4 shadow-2xl cyber-border">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "border border-primary/30 bg-primary/20 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <button 
                onClick={toggleVoiceSearch}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
              >
                <Mic className={`h-4 w-4 ${isListening ? "text-primary animate-pulse" : ""}`} />
                {isListening ? "Listening..." : "Voice Search"}
              </button>

              <div className="my-2 h-px bg-white/10" />
              {user ? (
                <>
                  <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-white/80">
                    <User className="h-4 w-4 text-primary" />
                    Welcome, {user.name}
                  </Link>
                  <Button variant="outline" className="mt-2 w-full border-destructive/20 text-destructive hover:bg-destructive/20" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="mt-2 flex flex-col gap-2">
                  <Link to="/sign-in" className="w-full">
                    <Button variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" className="w-full">
                    <Button className="glow-btn w-full bg-primary text-white hover:bg-primary/90">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
