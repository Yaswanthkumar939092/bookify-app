import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './addb.css';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    rating: '',
    description: '',
  });

  const [response, setResponse] = useState(null);

  const handleChange = event => {
    const { name, value } = event.target;
    setBookData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Perform the POST request to add a new book
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data);
        setBookData({
            title: '',
            authorId: 1,
            rating: 0,
            ratingCount: 0,
            reviewCount: 0,
            description: '',
            pages: 0,
            dateOfPublication: '',
            editionLanguage: '',
            price: 0,
            onlineStores: '',
        });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="add-book-container">
      <h1 className="add-book-title">Add a New Book</h1>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={bookData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="add-book-button">
          Post Book
        </button>
      </form>

      {response && (
        <div className="response-container">
          <h2 className="response-title">Response:</h2>
          <p>{JSON.stringify(response)}</p>
          <Link to="/books/new" className="add-another-book-button">
            Add Another Book
          </Link>
        </div>
      )}

      <Link to="/" className="back-button">
        Go Back
      </Link>
    </div>
  );
};

export default AddBook;
