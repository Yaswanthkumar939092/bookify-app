const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "db/bookify.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Get all books
app.get("/books", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM book
    ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
// Get a specific book by ID
app.get("/books/:bookId", async (request, response) => {
  const { bookId } = request.params;
  const getBookQuery = `
    SELECT *
    FROM book
    WHERE book_id = ${bookId};`;
  const book = await db.get(getBookQuery);
  response.send(book);
});

// Add a new book
app.post("/books", async (request, response) => {
  const bookDetails = request.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

  const addBookQuery = `
    INSERT INTO book (
      title,
      author_id,
      rating,
      rating_count,
      review_count,
      description,
      pages,
      date_of_publication,
      edition_language,
      price,
      online_stores
    )
    VALUES (
      '${title}',
      ${authorId},
      ${rating},
      ${ratingCount},
      ${reviewCount},
      '${description}',
      ${pages},
      '${dateOfPublication}',
      '${editionLanguage}',
      ${price},
      '${onlineStores}'
    );`;

  const dbResponse = await db.run(addBookQuery);
  const bookId = dbResponse.lastID;
  response.send({ bookId });
});

// Update a book
app.put("/books/:bookId", async (request, response) => {
  const { bookId } = request.params;
  const bookDetails = request.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;

  const updateBookQuery = `
    UPDATE book
    SET
      title='${title}',
      author_id=${authorId},
      rating=${rating},
      rating_count=${ratingCount},
      review_count=${reviewCount},
      description='${description}',
      pages=${pages},
      date_of_publication='${dateOfPublication}',
      edition_language='${editionLanguage}',
      price=${price},
      online_stores='${onlineStores}'
    WHERE
      book_id = ${bookId};`;

  await db.run(updateBookQuery);
  response.send("Book Updated Successfully");
});

// Delete a book
app.delete("/books/:bookId", async (request, response) => {
  const { bookId } = request.params;
  const deleteBookQuery = `
    DELETE FROM book
    WHERE book_id = ${bookId};`;

  await db.run(deleteBookQuery);
  response.send("Book Deleted Successfully");
});

// Get all books by an author
app.get("/authors/:authorId/books", async (request, response) => {
  const { authorId } = request.params;
  const getAuthorBooksQuery = `
    SELECT *
    FROM book
    WHERE author_id = ${authorId};`;

  const booksArray = await db.all(getAuthorBooksQuery);
  response.send(booksArray);
});

// Get books with pagination, search, sorting, and filtering options
app.get("/books", async (request, response) => {
  const {
    offset = 0,
    limit = 10,
    order = "ASC",
    orderBy = "book_id",
    searchQuery = "",
  } = request.query;

  const getBooksQuery = `
    SELECT *
    FROM book
    WHERE title LIKE '%${searchQuery}%'
    ORDER BY ${orderBy} ${order}
    LIMIT ${limit} OFFSET ${offset};`;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
