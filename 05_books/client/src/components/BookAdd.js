import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK } from '../mutations/books';
import { GET_BOOKS } from '../query/books';
import { GET_AUTHORS } from '../query/authors';

export default function BookAdd() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState(null);
  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  useEffect(() => {
    if (!loading) {
      setAuthors(data.authors);
      setAuthor(data.authors[0].id);
      setName('');
      setGenre('')
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, genre, author)
    addBook({
      variables: { name, genre, authorId: author },
      refetchQueries: [{ query: GET_BOOKS }] 
    });
  };

  return (
    <>
      {error && error.message}
      {loading && 'Loading...'}
      <form onSubmit={onSubmit}>
        <h3>Add Book</h3>
        <div>
          <label>Book Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Book Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Select Author</label>
          <select onChange={(e) => setAuthor(e.target.value)}>
            {authors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </>
  );
}
