import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../query/books';
import BookDetails from './BookDetails';
import BookAdd from './BookAdd';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null);
  const { data, loading, error } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (!loading) {
      setBooks(data.books);
    }
  }, [data]);

  return (
    <div>
      {error && error.message}
      {loading && 'Loading...'}
      <h1>Book List</h1>
      <ul id="book-list">
        {books &&
          books.map((book) => (
            <li key={book.id} onClick={() => setActiveBook(book)}>
              {book.name}
            </li>
          ))}
      </ul>
      <BookDetails data={activeBook} />
      <BookAdd />
    </div>
  );
}
