import React from "react";
import { useQuery, gql } from "@apollo/client";
import Container from "./Container";
import ItemContainer from "./ItemContainer";
import { FaBookReader } from "react-icons/fa";

function Authors() {
  const GET_AUTHORS = gql`
    query GetAuthors {
      authors {
        id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="page-header">Authors</h1>
      <Container>
        {data.authors.map((a) => (
          <ItemContainer key={a.id}>
            <div className="authors-name">
              <FaBookReader size={100} />
              <h3 className="author-name">{a.name}</h3>
            </div>
          </ItemContainer>
        ))}
      </Container>
    </>
  );
}

export default Authors;
