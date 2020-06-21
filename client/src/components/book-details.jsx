import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_BOOK } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { data = {}, loading } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });
  //   const [book,setBook]=useState(null)

  if (loading) {
    return <div id="book-details">Loading...</div>;
  }

  //   if (data && data.book) {
  //     setBook(data.book);
  //   }
  const renderItem = () => {
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((bookItem) => (
              <li key={bookItem.id}>{bookItem.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };
  return <div id="book-details">{renderItem()}</div>;
};

export default BookDetails;
