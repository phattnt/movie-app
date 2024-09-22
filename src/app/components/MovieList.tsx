"use client";

import { Image } from "@nextui-org/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}
interface MovieListProps {
  movies: Movie[];
}
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:grid-cols-3 mx-2 my-5 max-w-[70rem]">
      {movies.map((movie: Movie) => (
        <div key={movie.id} className="flex flex-col justify-center items-center">
          <Image
            isBlurred
            isZoomed
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={250}
            className="hover:cursor-pointer"
          />
          <p className="md:text-xl sm:text-base text-center h-12">{movie.title}</p>
        </div>
      ))}
    </div>
  );
};
export default MovieList;