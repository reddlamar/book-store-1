import React, { useState, useEffect } from "react";
import Books from "./Books";
import AddBook from "./AddBook";
import Publishers from "./Publishers";
import Authors from "./Authors";
function BookStore({ viewType }) {
  const [view, setView] = useState(null);

  useEffect(() => {
    switch (viewType) {
      case "books":
        setView(<Books />);
        break;
      case "addBook":
        setView(<AddBook />);
        break;
      case "publishers":
        setView(<Publishers />);
        break;
      case "authors":
        setView(<Authors />);
        break;
      default:
        setView(<Books />);
    }
  }, [viewType]);

  return <>{view}</>;
}

export default BookStore;
