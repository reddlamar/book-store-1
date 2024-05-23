import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [authorIds, setAuthorIds] = useState("");
  const [queryError, setQueryError] = useState("");

  const GET_PUBLISHERS = gql`
    query GetPublishers {
      publishers {
        id
        name
      }
    }
  `;

  const GET_AUTHORS = gql`
    query GetAuthors {
      authors {
        id
        name
      }
    }
  `;

  const ADD_BOOK = gql`
    mutation AddBook($book: BookInput!) {
      createBook(book: $book) {
        id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PUBLISHERS);

  console.log("publishers", data);

  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS);

  const [createBook, { loading: addLoading, error: addError }] =
    useMutation(ADD_BOOK);

  if (error) {
    setQueryError(error.message);
  } else if (authorsError) {
    setQueryError(authorsError.message);
  } else if (addError) {
    setQueryError(addError.message);
  }

  if (loading || authorsLoading || addLoading) return <p>Loading...</p>;

  if (queryError) return <p>Error: {queryError}</p>;

  return (
    <div className="add-book-form-container">
      <form
        className="add-book-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (bookName && publisherId !== "publisher" && authorIds.length > 0) {
            createBook({
              variables: { book: { name: bookName, publisherId, authorIds } },
            });
          }
        }}
      >
        <input
          type="text"
          placeholder="Title"
          name="book-title"
          value={bookName}
          onChange={(event) => setBookName(event.target.value)}
          className="book-inputs"
        />
        <select
          name="publishers"
          id="publishers"
          className="book-inputs"
          onChange={(event) => {
            setPublisherId(event.target.value);
          }}
        >
          <option defaultValue={"publisher"}>Select a publisher</option>
          {data.publishers.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          name="authors"
          id="authors"
          className="book-inputs"
          onChange={(event) => {
            const opts = event.target.selectedOptions;
            const values = [];
            for (let opt of opts) {
              values.push(opt.value);
            }
            setAuthorIds([...values]);
          }}
          multiple={true}
        >
          {authorsData.authors.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-btn">
          Save Book
        </button>
      </form>
    </div>
  );
}
