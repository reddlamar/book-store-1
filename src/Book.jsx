import React from "react";
import { FaBook, FaTrash } from "react-icons/fa";
import { useMutation, gql } from "@apollo/client";
import ItemContainer from "./ItemContainer";

function Book({ id, name, publisher, authors, refetch }) {
  const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
      deleteBook(bookId: $bookId) {
        id
        name
        publisher {
          name
        }
        authors {
          id
          name
        }
      }
    }
  `;

  const [deleteBook, { loading, error, data }] = useMutation(DELETE_BOOK);

  if (data) console.log("Data after deletion", data);

  if (loading) return <p>Deleting Book...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <ItemContainer>
      <div
        className="action-buttons"
        onClick={async () => {
          console.log("ID", id);
          await deleteBook({ variables: { bookId: id } });
          refetch();
        }}
      >
        <FaTrash size={25} color="#f00" />
      </div>
      <div className="book-icon">
        <FaBook size={50} />
      </div>
      <div className="title-container">
        <h2 className="title">Title</h2>
        <h2 className="name">{name}</h2>
      </div>
      <div className="publisher-container">
        <h3 className="publisher">Publisher</h3>
        <h3 className="publisher-name">{publisher.name}</h3>
      </div>
      <div className="author-container">
        <h4 className="authors-header">
          {authors.length > 1 ? "Authors" : "Author"}
        </h4>
        <div className="authors">
          {authors.map((a) => (
            <p key={a.id} className="author-name">
              {a.name}
            </p>
          ))}
        </div>
      </div>
    </ItemContainer>
  );
}

export default Book;
