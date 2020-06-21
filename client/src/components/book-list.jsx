import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import isEmpty from "lodash";

import { BOOKS } from "../queries/queries";
import BookDetails from "./book-details";

const BookList = () => {
  const { loading, error = {}, data } = useQuery(BOOKS);
  const [selectedBookId, setSelectedBookId] = useState("");

  const render = () => {
    const { books = [] } = data || {};
    return books.map((book) => (
      <li onClick={(e) => setSelectedBookId(book.id)} key={book.id}>
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id="book-list">{render()}</ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
};

export default BookList;
