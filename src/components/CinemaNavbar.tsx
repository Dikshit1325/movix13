import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/my-bookings", label: "My Bookings" },
  { to: "/account", label: "Account" },
];

export default function CinemaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/10 bg-black/80 py-2 shadow-2xl backdrop-blur-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2">
          <div className="rounded-xl bg-primary/20 p-2 transition-colors group-hover:bg-primary/30">
            <Film className="h-6 w-6 text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
          <span className="font-display text-2xl font-bold tracking-wider text-white">
            MOV<span className="text-primary">IX</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                location.pathname === link.to
                  ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mx-2 h-6 w-px bg-white/10" />

          {user ? (
            <div className="ml-2 flex items-center gap-3">
              <Link
                to="/account"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
              >
                <User className="h-4 w-4 text-primary" />
                <span className="max-w-[120px] truncate font-medium">{user.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link to="/sign-in">
                <Button variant="ghost" className="rounded-full text-white/80 hover:bg-white/10 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="rounded-full bg-primary text-white shadow-[0_0_15px_rgba(255,50,50,0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(255,50,50,0.5)]">
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

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[28rem] border-b border-white/10 bg-black/95 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
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
          <div className="my-2 h-px bg-white/10" />
          {user ? (
            <>
              <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-white/80">
                <User className="h-4 w-4 text-primary" />
                Welcome, {user.name}
              </Link>
              <Button variant="outline" className="mt-2 w-full border-white/10 text-white hover:bg-white/10 hover:text-white" onClick={logout}>
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
                <Button className="w-full bg-primary text-white hover:bg-primary/90">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
