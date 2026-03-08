import movie1 from "@/assets/movie-ishqan.png";
import movie2 from "@/assets/movie-bambukat.png";
import movie3 from "@/assets/movie-viyaah.png";
import movie4 from "@/assets/movie4.jpg";
import movie5 from "@/assets/movie5.jpg";
import movie6 from "@/assets/movie6.jpg";

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
    title: "Enchanted Realms",
    genre: "Animation",
    duration: "1h 45min",
    rating: 8.5,
    votes: "900+",
    poster: movie4,
    description: "A young girl discovers a hidden portal to a magical world where imagination comes alive. She must save this enchanted realm from a force that threatens to destroy all creativity.",
    cast: ["Emma Stone (voice)", "Tom Hanks (voice)", "Awkwafina (voice)"],
    releaseDate: "2026-04-10",
    trending: false,
    upcoming: true,
  },
  {
    id: 5,
    title: "Brothers in Arms",
    genre: "Action",
    duration: "2h 35min",
    rating: 8.8,
    votes: "2.1K+",
    poster: movie5,
    description: "Based on true events, three soldiers must navigate enemy territory to deliver a message that could end the war and save thousands of lives.",
    cast: ["Andrew Garfield", "John Boyega", "Pedro Pascal"],
    releaseDate: "2026-05-01",
    trending: false,
    upcoming: true,
  },
  {
    id: 6,
    title: "Nightstrike",
    genre: "Action",
    duration: "2h 15min",
    rating: 9.0,
    votes: "3.5K+",
    poster: movie6,
    description: "A masked vigilante rises from the shadows to protect the city from a criminal empire. But when his identity is threatened, he must decide what he's willing to sacrifice.",
    cast: ["Robert Pattinson", "Saoirse Ronan", "Idris Elba"],
    releaseDate: "2026-03-20",
    trending: true,
    upcoming: false,
  },
];

export const genres = ["All", "Sci-Fi", "Romance", "Horror", "Animation", "Action"];
