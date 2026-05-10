import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair, Check, Clock, Film, MapPin, QrCode, CreditCard, Wallet, Smartphone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { generateSeatLayout } from "@/data/theatres";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingSummary() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { confirmBooking, isSubmittingBooking, selectedMovie, selectedSeats, selectedShowTime, selectedTheatre } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<"review" | "payment">("review");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wallet">("card");

  const seats = useMemo(() => generateSeatLayout(selectedTheatre?.pricePerSeat), [selectedTheatre]);
  
  if (!selectedMovie || !selectedTheatre || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center bg-background">
        <Film className="h-16 w-16 text-white/20 mb-4" />
        <p className="text-white/50 tracking-widest uppercase">No active portal coordinates found.</p>
      </div>
    );
  }

  const total = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find(s => s.id === seatId);
    return sum + (seat?.price || 0);
  }, 0);

  const handleProceedToPayment = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please authenticate to secure these coordinates.",
      });
      navigate("/sign-in?redirect=/booking-summary");
      return;
    }
    setStep("payment");
  };

  const handleConfirm = async () => {
    try {
      await confirmBooking();
      setConfirmed(true);
      setTimeout(() => navigate("/my-bookings"), 3000);
    } catch (error) {
      toast({
        title: "Transmission Failed",
        description: error instanceof Error ? error.message : "Could not secure coordinates.",
        variant: "destructive",
      });
    }
  };

  if (confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 holographic-bg opacity-20 pointer-events-none" />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 text-center relative z-10"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 border-2 border-primary shadow-[0_0_50px_rgba(0,240,255,0.6)] animate-pulse-glow">
            <Check className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-4xl text-white font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Coordinates Secured</h2>
            <p className="text-primary mt-2 font-mono uppercase tracking-widest text-sm">Transmitting to your neural link...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-28 bg-background relative">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-lg px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-white">
            {step === "review" ? "Access " : "Secure "}<span className="glow-text">{step === "review" ? "Pass" : "Payment"}</span>
          </h1>
          <p className="text-white/50 tracking-widest uppercase text-xs mt-2 font-bold">
            {step === "review" ? "Review Transmission Details" : "Initialize Credit Transfer"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "review" ? (
            <motion.div 
              key="review"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="ticket-card rounded-3xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full h-full object-cover filter brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-4 left-4 glass-card px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Pass</span>
                </div>
              </div>
              
              <div className="p-8 relative">
                <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                  <div className="space-y-1">
                    <h2 className="font-display text-3xl font-black text-white">{selectedMovie.title}</h2>
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">{selectedMovie.genre}</p>
                  </div>
                  <div className="w-16 h-16 glass-card rounded-xl border border-white/10 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <QrCode className="w-full h-full text-white/80" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Location</p>
                    <p className="text-sm text-white font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" /> {selectedTheatre.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Time</p>
                    <p className="text-sm text-white font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> {selectedShowTime}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Coordinates (Seats)</p>
                    <p className="text-sm text-white font-medium flex items-center gap-2">
                      <Armchair className="w-4 h-4 text-primary" /> {selectedSeats.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 border-dashed flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Amount</p>
                    <p className="text-xs text-white/60 font-medium mt-0.5">{selectedSeats.length} Seats Selected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Total</p>
                    <span className="text-3xl font-display font-black text-white glow-text">Rs. {total}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleProceedToPayment}
                    className="glow-btn relative w-full overflow-hidden rounded-xl bg-primary py-4 text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="payment"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              className="glass-card rounded-3xl p-8 border border-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.1)] cyber-border relative"
            >
              <button 
                onClick={() => setStep("review")}
                className="absolute top-6 right-6 text-white/50 hover:text-white text-xs font-bold uppercase tracking-wider"
              >
                Back
              </button>
              
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-white/80">Encrypted Connection</span>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "card", icon: CreditCard, label: "Card" },
                    { id: "upi", icon: Smartphone, label: "UPI" },
                    { id: "wallet", icon: Wallet, label: "Wallet" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        paymentMethod === method.id 
                          ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]" 
                          : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      <method.icon className="w-6 h-6" />
                      <span className="text-xs font-bold uppercase tracking-widest">{method.label}</span>
                    </button>
                  ))}
                </div>

                {/* Simulated Payment Forms */}
                <div className="pt-4 pb-2">
                  <AnimatePresence mode="wait">
                    {paymentMethod === "card" && (
                      <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                        <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors text-sm" />
                        <div className="flex gap-3">
                          <input type="text" placeholder="MM/YY" className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors text-sm" />
                          <input type="text" placeholder="CVV" className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors text-sm" />
                        </div>
                      </motion.div>
                    )}
                    {paymentMethod === "upi" && (
                      <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                        <input type="text" placeholder="Enter UPI ID (e.g., movix@upi)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors text-sm" />
                        <p className="text-[10px] text-white/40 tracking-wider">A payment request will be sent to your UPI app.</p>
                      </motion.div>
                    )}
                    {paymentMethod === "wallet" && (
                      <motion.div key="wallet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                        <input type="tel" placeholder="Enter Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors text-sm" />
                        <p className="text-[10px] text-white/40 tracking-wider">OTP will be sent to verify your wallet.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-white font-medium">Rs. {total}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Convenience Fee</span>
                    <span className="text-white font-medium">Rs. 40</span>
                  </div>
                  <div className="flex justify-between items-center text-lg pt-4 border-t border-white/10">
                    <span className="font-bold text-white uppercase tracking-widest">Grand Total</span>
                    <span className="font-display font-black text-primary text-2xl glow-text">Rs. {total + 40}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleConfirm}
                    disabled={isSubmittingBooking}
                    className="glow-btn relative w-full overflow-hidden rounded-xl bg-primary py-4 text-sm font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                  >
                    {!isSubmittingBooking && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] animate-[scanline_2s_ease-in-out_infinite]" />
                    )}
                    <span className="relative z-10">{isSubmittingBooking ? "Processing..." : `Pay Rs. ${total + 40}`}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
