import React, { useState } from "react";
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Construct the URL for the search request
      const searchUrl = `http://7187-14-143-35-158.ngrok-free.app/search/${encodeURIComponent(query)}`;
      
      // Send the search request
      const response = await axios.get(searchUrl);
      
      // Pass the search results to the parent component (ProductList.js in this case)
      onSearch(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
