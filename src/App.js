import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutModal from "./AboutModal";
import APOD from "./APOD";
import NEO from "./NEO";
import SearchResults from "./SearchResults";

import "./App.css"; // Importe o arquivo CSS

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Você buscaria os dados aqui com base no searchTerm
  };

  return (
    
    <Router>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/apod">Image from the Day</Link>
          </li>
          <li>
            <Link to="/neo">Near Earth Objects</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/about" element={<AboutModal />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/neo" element={<NEO />} />
        <Route
          path="/"
          element={
            <div className="app-container">
              <h1 className="app-title">NASA</h1>
              <SearchResults
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
              />
            </div>
          }
        />
      </Routes>

      {searchTerm && <SearchResults searchTerm={searchTerm} />}
    </Router>
  );
};

export default App;
