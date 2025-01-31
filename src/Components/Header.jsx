import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const handleCategoryClick = () => {
    setShowCategories(!showCategories);
  };

  return (
    <header>
      <h1>GUTENDEX BOOK APPLICATION</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/favorites">Favorites</Link>
        {/* Use a button or link to toggle CategoryMenu */}
        <button onClick={handleCategoryClick}>
          {showCategories ? "Hide Categories" : "Show Categories"}
        </button>
      </nav>
      {/* Render CategoryMenu based on state */}
      {showCategories && <CategoryMenu />}
    </header>
  );
}
