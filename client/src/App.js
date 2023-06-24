import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/Homepage';
import BookCard from './components/BookCard/BookCard';
import AddBook from './components/AddBook/AddBookForm';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/books" element={<BookCard />} />
        <Route exact path="/books/new" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
