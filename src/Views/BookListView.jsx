import React, { useContext } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import BookDetailsView from "../Views/BookDetailsView";

export default function BookListView() {
  const { books, favorites, setFavorites } = useContext(AppContext);
  if (!books || books.length === 0) {
    return <p>No books available. Try reloading</p>;
  }
  const handleFavoriteClick = (bookId) => {
    const updatedFavorites = favorites.includes(bookId)
      ? favorites.filter((id) => id !== bookId)
      : [...favorites, bookId]; //if exits

    setFavorites(updatedFavorites); // updated and shared usind setfavorites
  };

  return (
    <div className="book-list">
      <h1>Book List</h1>
      <div className="book-grid">
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onFavoriteClick={handleFavoriteClick}
              isFavorite={favorites.includes(book.id)} // Pass correct favorite status
              bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"} // Pass image URL
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}
