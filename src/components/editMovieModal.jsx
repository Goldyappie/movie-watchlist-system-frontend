import { useState } from "react";
import "../styles/addMovieModal.css"

function EditMovieModal({ movie, toggleEditModal, setToggleEditModal, getMovies }) {
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [genre, setGenre] = useState(movie.genre);
    const [rating, setRating] = useState(movie.rating);
    const [status, setStatus] = useState(movie.status);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !genre || !rating) {
            alert("Don't leave these missing fields!");
            return;
        }

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${movie.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description,
                genre,
                rating,
                status
            })
        }
        )

        if (response.ok) {
            setToggleEditModal(false);
            getMovies();
        }
    }

    if (!toggleEditModal) {
        return null;
    }

    return (
        <div className="addMovieOverlay">
            <form onSubmit={handleSubmit} className="addMovieModal">
                <h2>Add Movie</h2>

                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Genre</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />

                <label>Rating</label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />

                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Plan to Watch">Plan to Watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Watched">Watched</option>
                </select>

                <button type="submit">Save Changes</button>

                <button
                    type="button"
                    onClick={() => setToggleEditModal(false)}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditMovieModal;