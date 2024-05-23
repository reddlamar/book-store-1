import React from "react";
import { useQuery, gql } from "@apollo/client";
import { MdOutlineMenuBook } from "react-icons/md";
import Container from "./Container";
import ItemContainer from "./ItemContainer";

function Publishers() {
  const GET_PUBLISHERS = gql`
    query GetPublishers {
      publishers {
        id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PUBLISHERS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="page-header">Publishers</h1>
      <Container>
        {data.publishers.map((p) => (
          <ItemContainer key={p.id}>
            <div className="book-icon">
              <MdOutlineMenuBook size={100} />
            </div>
            <div className="title-container">
              <h2 className="name">{p.name}</h2>
            </div>
          </ItemContainer>
        ))}
      </Container>
    </>
  );
}

export default Publishers;
