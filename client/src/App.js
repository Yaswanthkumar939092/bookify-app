import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/Homepage';
import Books from './components/books/books';
import AddBook from './components/AddBook/addbook';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/books/new" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
