import { useState } from "react";

function WatchedMoviesList({ watched, onDleteMovie }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDleteMovie={onDleteMovie} />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie, onDleteMovie }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button className="btn-delete" onClick={() => onDleteMovie(movie.imdbID)}>
                    x
                </button>
            </div>
        </li>
    );
}
export default WatchedMoviesList;
