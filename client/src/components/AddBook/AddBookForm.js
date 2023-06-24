import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./AddBookForm.css";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: "The Great Gatsby",
    authorId: 1,
    rating: 4.5,
    ratingCount: 100,
    reviewCount: 50,
    description: "A classic novel by F. Scott Fitzgerald",
    pages: 180,
    dateOfPublication: format(new Date(), "yyyy-MM-dd"),
    editionLanguage: "English",
    price: 19.99,
    onlineStores:
      "Amazon, Audible, Indigo, Apple Books, Google Play, IndieBound",
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform the POST request to add a new book
    fetch("hta869+                 0+cmtp://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setBookData({
          title: "",
          description: "",
          price: 0,
        });
        setShowAdditionalFields(false);
      })
      .catch((error) => console.log(error));
  };

  const handleAddAnotherBook = () => {
    setResponse(null);
    setShowAdditionalFields(false);
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
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            required
          />
        </div>

        {!showAdditionalFields ? (
          <button
            type="button"
            className="add-details-button"
            onClick={() => setShowAdditionalFields(true)}
          >
            Enter Full Details
          </button>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={bookData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pages">Pages:</label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={bookData.pages}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfPublication">Date of Publication:</label>
              <input
                type="date"
                id="dateOfPublication"
                name="dateOfPublication"
                value={format(new Date(), "yyyy-MM-dd")}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="onlineStores">Online Stores:</label>
              <input
                type="text"
                id="onlineStores"
                name="onlineStores"
                value={bookData.onlineStores}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="add-book-button">
          Post Book
        </button>
      </form>

      {response && (
        <div className="response-container">
          <h2 className="response-title">Response:</h2>
          <p>{JSON.stringify(response)}</p>
          <button
            type="button"
            className="add-another-book-button"
            onClick={handleAddAnotherBook}
          >
            Add Another Book
          </button>
        </div>
      )}

      {!showAdditionalFields && (
        <Link to="/" className="back-button">
          Go Back
        </Link>
      )}
    </div>
  );
};

export default AddBook;
