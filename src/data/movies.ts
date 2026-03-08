import movie1 from "@/assets/movie1.jpg";
import movie2 from "@/assets/movie2.jpg";
import movie3 from "@/assets/movie3.jpg";
import movie4 from "@/assets/movie4.jpg";
import movie5 from "@/assets/movie5.jpg";
import movie6 from "@/assets/movie6.jpg";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: number;
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
    title: "Galactic Frontier",
    genre: "Sci-Fi",
    duration: "2h 28min",
    rating: 4.5,
    poster: movie1,
    description: "In the year 2187, humanity's last hope lies beyond the stars. Captain Aria Voss must lead a daring mission through uncharted galaxies to find a new home before Earth's final days.",
    cast: ["Chris Hemsworth", "Zendaya", "Oscar Isaac", "Florence Pugh"],
    releaseDate: "2026-03-15",
    trending: true,
    upcoming: false,
  },
  {
    id: 2,
    title: "Love in Paris",
    genre: "Romance",
    duration: "1h 52min",
    rating: 4.2,
    poster: movie2,
    description: "Two strangers meet on a rainy evening in Paris, sparking a whirlwind romance that challenges everything they thought they knew about love and destiny.",
    cast: ["Timothée Chalamet", "Lily Collins", "Vincent Cassel"],
    releaseDate: "2026-02-14",
    trending: true,
    upcoming: false,
  },
  {
    id: 3,
    title: "The Hollow Manor",
    genre: "Horror",
    duration: "2h 05min",
    rating: 4.0,
    poster: movie3,
    description: "When a family inherits a centuries-old estate, they discover the house holds dark secrets. Every night, the walls whisper, and the shadows move on their own.",
    cast: ["Anya Taylor-Joy", "Bill Skarsgård", "Lupita Nyong'o"],
    releaseDate: "2026-03-01",
    trending: true,
    upcoming: false,
  },
  {
    id: 4,
    title: "Enchanted Realms",
    genre: "Animation",
    duration: "1h 45min",
    rating: 4.7,
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
    rating: 4.3,
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
    rating: 4.6,
    poster: movie6,
    description: "A masked vigilante rises from the shadows to protect the city from a criminal empire. But when his identity is threatened, he must decide what he's willing to sacrifice.",
    cast: ["Robert Pattinson", "Saoirse Ronan", "Idris Elba"],
    releaseDate: "2026-03-20",
    trending: true,
    upcoming: false,
  },
];

export const genres = ["All", "Sci-Fi", "Romance", "Horror", "Animation", "Action"];
