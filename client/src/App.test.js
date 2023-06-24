import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => this.setState({ books: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <h1>Books</h1>
        <ul>
          {books.map(book => (
            <li key={book.book_id}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
