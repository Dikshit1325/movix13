import { Seat } from "@/data/theatres";
import { motion } from "framer-motion";

interface Props {
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (id: string) => void;
}

export default function SeatLayout({ seats, selectedSeats, onToggleSeat }: Props) {
  const rows = Array.from(new Set(seats.map((s) => s.row)));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12">
      {/* Holographic Screen */}
      <div className="relative pt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/20 blur-[40px] pointer-events-none rounded-[100%]" />
        <div className="mx-auto w-3/4 h-4 rounded-[100%] border-t-2 border-primary shadow-[0_-15px_40px_rgba(0,240,255,0.4)]" />
        <div className="mt-4 flex flex-col items-center justify-center">
          <p className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase animate-pulse">Projection Area</p>
        </div>
      </div>

      {/* Seats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-3">
            <span className="w-6 text-xs font-bold text-white/50 text-center">{row}</span>
            <div className="flex gap-2">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isBooked = seat.status === "booked";
                  const zoneClass = `zone-${seat.zone}`;
                  
                  return (
                    <motion.button
                      variants={itemVariants}
                      key={seat.id}
                      onClick={() => !isBooked && onToggleSeat(seat.id)}
                      className={`relative w-8 h-8 rounded-t-xl text-[10px] font-bold flex items-center justify-center overflow-hidden transition-all duration-300 ${zoneClass} ${
                        isBooked
                          ? "seat-booked"
                          : isSelected
                          ? "seat-selected text-white"
                          : "seat-available text-white/90"
                      }`}
                      disabled={isBooked}
                      title={`${seat.id} - ${seat.zone.toUpperCase()} ZONE`}
                      whileHover={!isBooked ? { scale: 1.15 } : {}}
                      whileTap={!isBooked ? { scale: 0.95 } : {}}
                    >
                      <span className="relative z-10">{seat.number}</span>
                      {/* Seat Glow Effect */}
                      {!isBooked && (
                        <div className="absolute bottom-0 w-full h-1 bg-white/20 rounded-b-xl" />
                      )}
                    </motion.button>
                  );
                })}
            </div>
            <span className="w-6 text-xs font-bold text-white/50 text-center">{row}</span>
          </div>
        ))}
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/5">
        {[
          { label: "Hype Zone (Front)", cls: "seat-available zone-hype" },
          { label: "Zen Zone (Middle)", cls: "seat-available zone-zen" },
          { label: "Date Zone (Back)", cls: "seat-available zone-date" },
          { label: "Selected", cls: "seat-selected" },
          { label: "Occupied", cls: "seat-booked" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-t-lg shadow-lg ${item.cls} ${item.label === 'Selected' ? 'animate-pulse' : ''}`} />
            <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
