import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Bookify!</h1>
      <p className="homepage-description">
        Where books come to party and stories unfold. Get ready to dive into a world of literary adventures!
      </p>
      <p className="homepage-subtitle">Select an action:</p>
      
      <ul className="homepage-actions">
        <li>
          <Link to="/books" className="homepage-link">
            <span className="homepage-link-text">GET</span>
            <span className="homepage-link-description">View All Books</span>
          </Link>
        </li>
        <li>
          <Link to="/books/new" className="homepage-link">
            <span className="homepage-link-text">POST</span>
            <span className="homepage-link-description">Add a New Book</span>
          </Link>
        </li>
        <li>
          <Link to="/books/edit" className="homepage-link">
            <span className="homepage-link-text">PUT</span>
            <span className="homepage-link-description">Edit a Book</span>
          </Link>
        </li>
        <li>
          <Link to="/books/delete" className="homepage-link">
            <span className="homepage-link-text">DELETE</span>
            <span className="homepage-link-description">Delete a Book</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
