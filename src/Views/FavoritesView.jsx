import React, { useContext, useCallback } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function FavoritesView() {
  const { books, favorites, setFavorites } = useContext(AppContext);

  // Filter books that are in favorites
  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  // Handle remove favorite (Fix: Only removes selected book)
  const handleFavoriteClick = useCallback(
    (bookId) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(bookId)) {
          // If book exists, remove it
          return prevFavorites.filter((id) => id !== bookId);
        } else {
          // If book does not exist, add it
          return [...prevFavorites, bookId];
        }
      });
    },
    [setFavorites]
  );

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      <div className="favorite-list">
        {favoriteBooks.length > 0 ? (
          favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={true} // It's a favorite page, so always true
              onFavoriteClick={() => handleFavoriteClick(book.id)} // Ensure correct book is removed
              bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"}
            />
          ))
        ) : (
          <p>No favorite books yet.</p>
        )}
      </div>
    </div>
  );
}
