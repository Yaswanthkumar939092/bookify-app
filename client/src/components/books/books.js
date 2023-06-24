import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './books.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the server
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="books-container">
      <Link to="/" className="back-button">Go Back</Link>
      <h1 className="books-title">All Books</h1>
      <ul className="books-list">
        {books.map(book => (
          <li key={book.book_id} className="book-item">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author: {book.author}</p>
            <p className="book-rating">Rating: {book.rating}</p>
            <p className="book-description">{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
