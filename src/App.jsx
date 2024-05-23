import BookStore from "./BookStore";
import "./App.css";
import { useState } from "react";

function App() {
  const [viewType, setViewType] = useState("books");

  const onClickViewTypeHome = () => {
    setViewType("books");
  };

  const onClickViewTypeAddBook = () => {
    setViewType("addBook");
  };

  const onClickViewTypePublisher = () => {
    setViewType("publishers");
  };

  const onClickViewTypeAuthors = () => {
    setViewType("authors");
  };

  return (
    <div className="container">
      <nav className="menu">
        <span className="menu-item" onClick={onClickViewTypeHome}>
          Home
        </span>
        <span className="menu-item" onClick={onClickViewTypeAddBook}>
          Add Book
        </span>
        <span className="menu-item" onClick={onClickViewTypePublisher}>
          Publishers
        </span>
        <span className="menu-item" onClick={onClickViewTypeAuthors}>
          Authors
        </span>
      </nav>
      <div className="inner-container">
        <div>
          <BookStore viewType={viewType} />
        </div>
      </div>
    </div>
  );
}

export default App;
