import { useQuery, gql } from "@apollo/client";
import Book from "./Book";
import Container from "./Container";

import React, { useEffect } from "react";

function Books() {
  const GET_BOOKS = gql`
    query GetBooks {
      books {
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

  const { loading, error, data, refetch } = useQuery(GET_BOOKS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="page-header">
        <h1>Books</h1>
      </div>
      <Container>
        {data.books.map(({ id, name, publisher, authors }) => (
          <Book
            key={id}
            id={id}
            name={name}
            publisher={publisher}
            authors={authors}
            refetch={refetch}
          />
        ))}
      </Container>
    </>
  );
}

export default Books;
