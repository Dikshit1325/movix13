import movie1 from "@/assets/movie-ishqan.png";
import movie2 from "@/assets/movie-bambukat.png";
import movie3 from "@/assets/movie-viyaah.png";
import movie4 from "@/assets/movie-dhurandhar.png";
import movie5 from "@/assets/movie-toxic.png";
import movie6 from "@/assets/movie-kerala-story.png";
import movie7 from "@/assets/movie1.jpg";
import movie8 from "@/assets/movie2.jpg";
import movie9 from "@/assets/movie3.jpg";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  language: string;
  duration: string;
  rating: number;
  votes: string;
  poster: string;
  description: string;
  cast: string[];
  releaseDate: string;
  trending: boolean;
  upcoming: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Ishqa'n De Lekhe",
    genre: "Romance",
    language: "Punjabi",
    duration: "2h 10min",
    rating: 8.7,
    votes: "230+",
    poster: movie1,
    description: "A heartfelt Punjabi love story that explores the depths of emotion and sacrifice between two souls bound by fate.",
    cast: ["Sajjan Adeeb", "Payal Rajput"],
    releaseDate: "2026-03-15",
    trending: true,
    upcoming: false,
  },
  {
    id: 2,
    title: "Bambukat 2",
    genre: "Comedy",
    language: "Punjabi",
    duration: "2h 20min",
    rating: 9.3,
    votes: "1.7K+",
    poster: movie2,
    description: "The hilarious sequel set in pre-partition Punjab where families compete to show off their wealth and status at a wedding.",
    cast: ["Ammy Virk", "Sonam Bajwa", "Binnu Dhillon"],
    releaseDate: "2026-02-14",
    trending: true,
    upcoming: false,
  },
  {
    id: 3,
    title: "Viyaah Kartaare Da",
    genre: "Romance",
    language: "Punjabi",
    duration: "2h 15min",
    rating: 9.2,
    votes: "1.2K+",
    poster: movie3,
    description: "A vibrant Punjabi romantic comedy about love, family traditions, and the chaos of wedding preparations.",
    cast: ["Gippy Grewal", "Sonam Bajwa"],
    releaseDate: "2026-03-01",
    trending: true,
    upcoming: false,
  },
  {
    id: 4,
    title: "Dhurandhar: The Revenge",
    genre: "Action",
    language: "Hindi",
    duration: "2h 30min",
    rating: 9.1,
    votes: "1.5K+",
    poster: movie4,
    description: "A fiery tale of vengeance as a fearless warrior rises from the ashes to reclaim justice. Explosions, swords, and an unstoppable force collide.",
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon"],
    releaseDate: "2026-03-19",
    trending: false,
    upcoming: true,
  },
  {
    id: 5,
    title: "Toxic",
    genre: "Action",
    language: "Hindi",
    duration: "2h 25min",
    rating: 9.4,
    votes: "2.8K+",
    poster: movie5,
    description: "A gripping noir thriller set in rain-soaked streets where a lone gunman with a dark past takes on the criminal underworld.",
    cast: ["Yash", "Nayanthara", "Kiara Advani"],
    releaseDate: "2026-06-04",
    trending: false,
    upcoming: true,
  },
  {
    id: 6,
    title: "The Kerala Story 2",
    genre: "Drama",
    language: "Hindi",
    duration: "2h 40min",
    rating: 9.3,
    votes: "13.8K+",
    poster: movie6,
    description: "The gripping sequel goes deeper into untold truths and harrowing journeys of courage, faith, and survival.",
    cast: ["Adah Sharma", "Yogita Bihani", "Sonia Balani"],
    releaseDate: "2026-03-20",
    trending: true,
    upcoming: false,
  },
  {
    id: 7,
    title: "Skyline Protocol",
    genre: "Thriller",
    language: "English",
    duration: "2h 6min",
    rating: 8.8,
    votes: "980+",
    poster: movie7,
    description: "A fast-moving espionage thriller where a cyber analyst uncovers a conspiracy hidden inside a global intelligence network.",
    cast: ["Emma Brooks", "Daniel Reed", "Marcus Vale"],
    releaseDate: "2026-01-19",
    trending: true,
    upcoming: false,
  },
  {
    id: 8,
    title: "Velvet Night",
    genre: "Drama",
    language: "English",
    duration: "2h 18min",
    rating: 8.5,
    votes: "760+",
    poster: movie8,
    description: "A moody relationship drama that follows three artists through one unforgettable night of ambition, betrayal, and renewal.",
    cast: ["Sophie Lane", "Noah Carter", "Ella Monroe"],
    releaseDate: "2026-02-28",
    trending: false,
    upcoming: false,
  },
  {
    id: 9,
    title: "The Last Frequency",
    genre: "Sci-Fi",
    language: "English",
    duration: "2h 22min",
    rating: 9,
    votes: "1.1K+",
    poster: movie9,
    description: "When the world loses contact with every satellite at once, a small radio team becomes humanity's last link to the truth.",
    cast: ["Ryan Cole", "Mia Harper", "Julian West"],
    releaseDate: "2026-05-22",
    trending: false,
    upcoming: true,
  },
];

export const genres = ["All", ...Array.from(new Set(movies.map((movie) => movie.genre)))];
export const movieLanguages = Array.from(new Set(movies.map((movie) => movie.language)));
