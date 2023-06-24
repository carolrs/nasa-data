import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const NASA_API_KEY = 'IanNgx71Pof7nTkF1zhReAvuAtILZbxSwSQ0glJM';

  const searchImages = async () => {
    if (searchTerm === '') return;

    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.collection.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for images"
        />
        <button className="search-button" onClick={searchImages}>
          <FiSearch />
        </button>
      </div>
      <div className="card-container">
        {searchResults.length === 0 ? (
          <p className="no-results">No results.</p>
        ) : (
          searchResults.map((item, index) => (
            <div className="card" key={index}>
              <h2>{item.data?.[0]?.title || 'Title Not Available'}</h2>
              <img src={item.links?.[0]?.href} alt={item.data?.[0]?.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
