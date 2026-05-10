import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatLayoutComponent from "@/components/SeatLayout";
import { useBooking } from "@/context/BookingContext";
import { generateSeatLayout } from "@/data/theatres";
import { MapPin, Clock, CalendarDays, ShieldAlert, Users, Copy, CheckCircle2, Timer, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SeatSelection() {
  const navigate = useNavigate();
  const { selectedMovie, selectedShowTime, selectedTheatre, setSelectedSeats } = useBooking();
  const seats = useMemo(() => generateSeatLayout(selectedTheatre?.pricePerSeat), [selectedTheatre]);
  const [localSeats, setLocalSeats] = useState<string[]>([]);
  
  // Squad Sync State
  const [showSquadModal, setShowSquadModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSquadModal && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showSquadModal, timeLeft]);

  if (!selectedMovie || !selectedTheatre) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center bg-background">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4 animate-pulse" />
        <p className="text-white/50 tracking-widest uppercase">Target Not Acquired. Select coordinates first.</p>
      </div>
    );
  }

  const toggleSeat = (id: string) => {
    setLocalSeats((current) => (current.includes(id) ? current.filter((seat) => seat !== id) : [...current, id]));
  };

  const total = localSeats.reduce((sum, seatId) => {
    const seat = seats.find(s => s.id === seatId);
    return sum + (seat?.price || 0);
  }, 0);

  const handleProceed = () => {
    setSelectedSeats(localSeats);
    navigate("/booking-summary");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://movix.app/squad/" + Math.random().toString(36).substring(7));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen pb-32 pt-28 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-4">
            AQUIRE <span className="glow-text">POSITION</span>
          </h1>
          
          <div className="inline-flex flex-wrap items-center justify-center gap-4 glass-card px-6 py-2.5 rounded-full border border-white/10 cyber-border">
            <span className="flex items-center gap-2 text-sm font-bold text-white/80">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {selectedMovie.title}
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/60">
              <MapPin className="w-4 h-4 text-secondary" /> {selectedTheatre.name}
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/60">
              <Clock className="w-4 h-4 text-accent" /> {selectedShowTime}
            </span>
          </div>
        </div>

        <div className="glass-card mt-8 rounded-3xl p-6 md:p-10 border border-primary/20 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative z-0">
          <SeatLayoutComponent seats={seats} selectedSeats={localSeats} onToggleSeat={toggleSeat} />
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl glass-card border border-primary/30 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl cyber-border z-40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start text-sm">
              <span className="text-white/50 uppercase tracking-widest text-[10px] font-bold mb-1">Status</span>
              {localSeats.length > 0 ? (
                <div className="text-white/80 font-medium">
                  <span className="font-bold text-primary text-lg">{localSeats.length}</span> positions secured:{" "}
                  <span className="font-bold text-white tracking-wide">{localSeats.join(", ")}</span>
                </div>
              ) : (
                <div className="text-white/40 italic">Awaiting selection sequence...</div>
              )}
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-white/50 uppercase tracking-widest text-[10px] font-bold mb-0.5">Total Credits</span>
                <span className="text-2xl font-display font-black text-white glow-text">Rs. {total}</span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowSquadModal(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl border border-secondary/50 bg-secondary/10 text-white font-bold tracking-wide hover:bg-secondary/30 transition-all"
                >
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="hidden sm:inline">Squad Sync</span>
                  <span className="sm:hidden">Sync</span>
                </button>
                <button
                  onClick={handleProceed}
                  disabled={localSeats.length === 0}
                  className="flex-1 sm:flex-none glow-btn px-6 sm:px-8 py-3 rounded-xl bg-primary text-white font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Sync Modal */}
      <AnimatePresence>
        {showSquadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSquadModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-3xl border border-secondary/40 p-8 shadow-[0_0_50px_rgba(120,0,255,0.3)] cyber-border"
            >
              <button 
                onClick={() => setShowSquadModal(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary/50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(120,0,255,0.4)]">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">Squad Lobby Active</h2>
                <p className="text-sm text-white/60">Share this secure uplink or scan the QR to join.</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {/* Fake QR Code */}
                  <div className="w-32 h-32 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://movix.app/squad/lock-8x92f')] bg-cover" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-xl border border-white/10 p-4 flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-white/80 truncate flex-1">
                    https://movix.app/squad/lock-8x92f...
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className="flex-shrink-0 flex items-center gap-2 bg-secondary/20 hover:bg-secondary/40 text-secondary px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    {copiedLink ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? "Copied" : "Copy"}
                  </button>
                </div>

                <button 
                  onClick={() => alert("Splitwise integration simulated! Request sent to squad.")}
                  className="w-full flex items-center justify-center gap-2 bg-[#00d09c] hover:bg-[#00b085] text-white px-4 py-3 rounded-xl font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,208,156,0.4)]"
                >
                  <img src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b18a6c146d501700db50b73c4314c9c1b3fbc1ee3dd50e64303.svg" alt="Splitwise" className="w-5 h-5 filter brightness-0 invert" />
                  Split via Splitwise
                </button>

                <div className="flex items-center justify-between px-2 text-sm mt-4">
                  <span className="text-white/50 font-medium">Positions locked: {localSeats.length}</span>
                  <div className="flex items-center gap-1.5 text-accent font-bold">
                    <Timer className="w-4 h-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>

                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 600, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-accent to-secondary"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
