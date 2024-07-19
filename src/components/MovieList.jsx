import Movie from "./Movie";

function MovieList({ movies, onSelectMovies }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} onSelectMovies={onSelectMovies} key={movie.imdbID} />
            ))}
        </ul>
    );
}
export default MovieList;
