import { useEffect, useState } from "react";
import StarRating from "./components/StarRating"
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";

import MovieList from "./components/MovieList";
import Box from "./components/ListBox";
import WatchedMoviesList from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchesSummary";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f76006b7";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const tempQuery = "Interstellar";
  useEffect(function () {

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)

        if (!res.ok) throw new Error("Something went wrong with fetch data")
        const data = await res.json()
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search)
        setIsLoading(false);
      }
      catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("")
      return;
    }

    fetchMovies()
  }, [query])


  function handleSelectMovies(id) {
    setSelectedId(id)
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handelAddMovie(movie) {
    setWatched((watched) => [...watched, movie])
  }
  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }
  return (
    <>

      <NavBar >
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} query={query} />
      </NavBar>
      <Main >
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovies={handleSelectMovies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId} watched={watched} onCloseMovie={handleCloseMovie} onAddWatched={handelAddMovie} /> : <><WatchedSummary watched={watched} average={average} />
            <WatchedMoviesList watched={watched} onDleteMovie={handleDeleteMovie} /></>}
        </Box>

      </Main>

    </>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserrating = watched.find((movie) => movie.imdbID === selectedId)?.userRating
    ;
  console.log(isWatched);
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating,
    Plot: plot, Released: released, Actors: actors,
    Director: director, Cenre: genre } = movie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie)
    onCloseMovie();
  }
  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    }
  }, [title])
  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails()
  }, [selectedId])
  return (
    <>
      <div className="details">
        {isLoading ? <Loader /> :
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
              <img src={poster} alt={`Poster of ${movie} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>{released} &bull;</p>
                <p>{genre}</p>
                <p><span>⭐️</span>{imdbRating} IMDb rating</p>
              </div>
            </header>
            <section>
              <div className="rating">

                {!isWatched ? (
                  <> <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                    {userRating > 0 && (

                      <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                    )}
                  </>
                ) : (<p>You rated with movie {watchedUserrating} <span>⭐️</span></p>)}

              </div>

              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>

          </>
        }

      </div>
    </>
  );
}
