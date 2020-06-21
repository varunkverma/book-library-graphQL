import React, { useState } from "react";
// import {graphql} from "react-apollo"
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_AUTHORS, ADD_BOOK_MUTATION, BOOKS } from "../queries/queries";

const AddBook = () => {
  const { data, loading } = useQuery(GET_AUTHORS);
  const { authors = [] } = data || {};
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(ADD_BOOK_MUTATION);
  const getAuthorOptions = () => {
    if (loading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return authors.map((author) => (
        <option value={author.id} key={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    console.log({ variables: { name, genre, authorId } });
    addBook({
      variables: { name: name, genre: genre, authorId: authorId },
      refetchQueries: [{ query: BOOKS }],
    });
  };

  return (
    <form action="" id="add-book" onSubmit={onFormSubmit}>
      <div className="field">
        <label htmlFor="name">Book Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="">Author:</label>
        <select
          name="authorId"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Select Author</option>
          {getAuthorOptions()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
