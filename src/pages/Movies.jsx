import { useState, useEffect } from "react"
import AddMovieModal from "../components/addMovieModal";
import EditMovieModal from "../components/editMovieModal";
import "../styles/Movies.css"

function Movies({ setPage }) {
    const [toggleModal, setToggleModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [toggleEditModal, setToggleEditModal] = useState(false);
    const [movies, setMovies] = useState([]);

    const token = localStorage.getItem("token")

    async function getMovies() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json();
            setMovies(data.data);
        } else {
            console.log("Failed to retrieve movies.")
            return;
        }
    }

    async function deleteMovie(id) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            getMovies();
        }
    }

    async function logOut() {
        const token = localStorage.removeItem("token");
        setPage("register")
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="moviesOverlay">
            <div className="moviesModal">
                <div className="moviesHeader">
                    <h2>Movie Watchlist</h2>
                    <button type="button" onClick={() => setToggleModal(!toggleModal)}>Add movie</button>
                    <button type="button" onClick={() => logOut()}>Logout</button>
                </div>
                <div className="movieList">
                    {movies.map((movie) => (
                        <div className="movieItem" key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.description}</p>
                            <p>{movie.genre}</p>
                            <p>{movie.rating}</p>
                            <p>{movie.status}</p>

                            <div className="movieButtons">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedMovie(movie);
                                        setToggleEditModal(true);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => deleteMovie(movie.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {toggleModal && (
                <AddMovieModal
                    toggleModal={toggleModal}
                    setToggleModal={setToggleModal}
                    getMovies={getMovies}
                />
            )}

            {toggleEditModal && selectedMovie && (
                <EditMovieModal
                    movie={selectedMovie}
                    toggleEditModal={toggleEditModal}
                    setToggleEditModal={setToggleEditModal}
                    getMovies={getMovies}
                />
            )}
        </div>

    )
}

export default Movies;