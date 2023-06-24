import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "./BookCard.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the server
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="books-container">
      <Link to="/" className="back-button">
        Go Back
      </Link>
      <h1 className="books-title">All Books</h1>
      <div className="books-card-container">
        {books.map((book) => (
          <div key={book.book_id} className="book-card">
            <div className="book-card-front">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-rating">
                Rating: <FaStar className="star-icon" /> {book.rating}
              </p>

              <p className="book-rating">Rating Count: {book.rating_count}</p>
              <p className="book-description">{book.description}</p>
            </div>
            <div className="book-card-back">
              <p className="book-review">Review Count: {book.review_count}</p>
              <p className="book-pages">Pages: {book.pages}</p>
              <p className="book-publication">
                Date of Publication: {book.date_of_publication}
              </p>
              <p className="book-online-stores">
                Online Stores: {book.online_stores}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
