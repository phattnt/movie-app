"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovies,
  fetchMovies,
  setCategory,
  setPage,
} from "../store/movieSlice";
import { AppDispatch, RootState } from "../store/store";
import { Tab, Tabs } from "@nextui-org/tabs";
import MovieList from "./MovieList";
import { Pagination } from "@nextui-org/pagination";

interface MovieState {
  category: string;
  page: number;
  movies: Movie[];
  total_pages: number;
}

interface Movie {
  title: string;
  poster_path: string;
}

const Movie = ({ initialData }: { initialData: MovieState }) => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectMovies);
  const category = useSelector((state: RootState) => state.movie.category);
  const page = useSelector((state: RootState) => state.movie.page);

  useEffect(() => {
    dispatch(fetchMovies({ category, page }));
  }, [category, page, dispatch]);

  return (
    <div>
      <div className="flex justify-center">
        <div className=" w-full max-w-[30rem]">
          <Tabs
            size="lg"
            aria-label="Movie Categories"
            onSelectionChange={(key) => dispatch(setCategory({ key }))}
            color="secondary"
            variant="bordered"
            fullWidth
          >
            <Tab key="popular" title="Popular"></Tab>
            <Tab key="top_rated" title="Top Rated"></Tab>
            <Tab key="upcoming" title="Up Coming"></Tab>
          </Tabs>
        </div>
      </div>
      <div>
        <MovieList movies={movies || initialData} />
      </div>
      <div className="flex justify-center">
        <Pagination
          total={initialData.total_pages}
          initialPage={1}
          onChange={(page) => dispatch(setPage(page))}
          showControls
        />
      </div>
    </div>
  );
};

export default Movie;
