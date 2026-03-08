import movie1 from "@/assets/movie-ishqan.png";
import movie2 from "@/assets/movie-bambukat.png";
import movie3 from "@/assets/movie-viyaah.png";
import movie4 from "@/assets/movie-dhurandhar.png";
import movie5 from "@/assets/movie-toxic.png";
import movie6 from "@/assets/movie-kerala-story.png";

export interface Movie {
  id: number;
  title: string;
  genre: string;
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
    duration: "2h 25min",
    rating: 9.4,
    votes: "2.8K+",
    poster: movie5,
    description: "A gripping noir thriller set in the rain-soaked streets. A lone gunman with a dark past takes on the criminal underworld in a tale that redefines revenge.",
    cast: ["Yash", "Nayanthara", "Kiara Advani"],
    releaseDate: "2026-06-04",
    trending: false,
    upcoming: true,
  },
  {
    id: 6,
    title: "The Kerala Story 2",
    genre: "Drama",
    duration: "2h 40min",
    rating: 9.3,
    votes: "13.8K+",
    poster: movie6,
    description: "The gripping sequel that goes beyond — unveiling untold truths and harrowing journeys of courage, faith, and survival.",
    cast: ["Adah Sharma", "Yogita Bihani", "Sonia Balani"],
    releaseDate: "2026-03-20",
    trending: true,
    upcoming: false,
  },
];

export const genres = ["All", "Romance", "Comedy", "Action", "Drama"];
