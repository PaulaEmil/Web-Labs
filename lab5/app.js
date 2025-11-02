import "./styles.css";

import React, { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddMovie = () => {
    if (!movieName || rating === 0) {
      alert("Please enter a movie name and select a rating!");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: movieName,
      comment: comment || "No comment",
      rating,
    };

    setMovies((prev) => [...prev, newMovie]);
    setMovieName("");
    setComment("");
    setRating(0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Movie Rating App</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.stars}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              onClick={() => setRating(value)}
              style={{
                ...styles.star,
                color: value <= rating ? "#ffcc00" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <button onClick={handleAddMovie} style={styles.button}>
          Add Movie
        </button>
      </div>

      <div style={styles.list}>
        {movies.length === 0 ? (
          <p style={{ color: "#777" }}>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} style={styles.card}>
              <h2 style={styles.movieTitle}>
                {movie.title}{" "}
                <span style={styles.rating}>({movie.rating}⭐)</span>
              </h2>
              <p style={styles.comment}>"{movie.comment}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "30px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "0 auto 30px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
  },
  stars: {
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "10px",
    cursor: "pointer",
  },
  star: {
    margin: "0 3px",
    transition: "color 0.2s ease",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  list: {
    maxWidth: "500px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  movieTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  rating: {
    color: "#ffcc00",
  },
  comment: {
    fontStyle: "italic",
    color: "#555",
  },
};
