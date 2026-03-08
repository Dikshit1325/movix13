export interface Theatre {
  id: number;
  name: string;
  location: string;
  showTimings: string[];
  pricePerSeat: number;
}

export const theatres: Theatre[] = [
  {
    id: 1,
    name: "CineMax IMAX",
    location: "Downtown Mall, 5th Avenue",
    showTimings: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"],
    pricePerSeat: 250,
  },
  {
    id: 2,
    name: "StarPlex Cinemas",
    location: "Phoenix Market City, MG Road",
    showTimings: ["11:00 AM", "2:30 PM", "6:00 PM", "10:00 PM"],
    pricePerSeat: 200,
  },
  {
    id: 3,
    name: "Royal Theatre 4DX",
    location: "Central Plaza, Park Street",
    showTimings: ["9:30 AM", "12:30 PM", "4:00 PM", "8:30 PM"],
    pricePerSeat: 350,
  },
  {
    id: 4,
    name: "Galaxy Multiplex",
    location: "Riverside Drive, Sector 21",
    showTimings: ["10:30 AM", "2:00 PM", "5:30 PM", "9:30 PM"],
    pricePerSeat: 180,
  },
];

// Generate seat layout: 8 rows x 10 cols
export type SeatStatus = "available" | "booked";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

export function generateSeatLayout(): Seat[] {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seats: Seat[] = [];
  const bookedSeats = new Set(["A3", "A4", "B7", "C2", "C3", "D5", "E8", "F1", "F2", "G6", "G7", "H4", "H5"]);

  rows.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      const id = `${row}${i}`;
      seats.push({
        id,
        row,
        number: i,
        status: bookedSeats.has(id) ? "booked" : "available",
      });
    }
  });

  return seats;
}
