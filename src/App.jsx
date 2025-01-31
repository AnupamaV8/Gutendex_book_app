import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";

export const AppContext = createContext();

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState("https://gutendex.com/books");
  const [isFetching, setIsFetching] = useState(false);

  // Load favorites from local storage
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const baseAPIurl = "https://gutendex.com/books";

  // Function to fetch books from API
  const fetchBooks = async (url) => {
    if (isFetching) return; // Prevent multiple fetches at the same time
    setIsFetching(true);
    try {
      console.log(`Fetching from URL: ${url}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Full API Response:", data);

      // Ensure books are unique
      setBooks((prevBooks) => {
        const bookMap = new Map();
        [...prevBooks, ...data.results].forEach((book) => {
          bookMap.set(book.id, book); // Store unique books using ID
        });
        return Array.from(bookMap.values()); // Convert back to array
      });

      setNextPageUrl(data.next || null); // Update next page URL
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // Fetch book details
  const fetchBookDetails = async (id) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${baseAPIurl}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch book details");
      const data = await response.json();
      setSelectedBook(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books only on component mount (once)
  useEffect(() => {
    console.log("Fetching books from:", nextPageUrl);
    fetchBooks(nextPageUrl);
  }, []); // Run only once

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        categories,
        setCategories,
        favorites,
        setFavorites,
        selectedBook,
        error,
        loading,
        fetchBooks,
        fetchBookDetails,
      }}
    >
      <div>
        <Header />
        <main className="container">
          {loading && books.length === 0 ? (
            <div className="loading">Loading...</div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </AppContext.Provider>
  );
}
