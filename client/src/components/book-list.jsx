import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import isEmpty from "lodash";

const BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`;

const BookList = () => {
  const { loading, error = {}, data } = useQuery(BOOKS);

  const render = () => {
    if (loading) {
      return <div>Loading Books...</div>;
    } else if (error && !isEmpty(error.message)) {
      return <div>Error: {error.message}</div>;
    } else {
      const { books = [] } = data || {};
      return books.map((book) => <li key={book.id}>{book.name}</li>);
    }
  };

  return (
    <div>
      <ul id="book-list">{render()}</ul>
    </div>
  );
};

export default BookList;
