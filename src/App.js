import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutModal from "./AboutModal";
import APOD from "./APOD";
import EventsMap from "./EventsMap";
import SearchResults from "./SearchResults";
import "./App.css";
import logo from "./logo/nasa.png";
import SearchVideos from "./SearchVideos";
import Explore from "./Explorer";
import Footer from "./Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Router>
      <img src={logo} alt="NASA logo" className="nasa-logo" />
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/apod">APOD</Link>
          </li>
          <li>
            <Link to="/neo">Events</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/about" element={<AboutModal />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/neo" element={<EventsMap />} />
        <Route path="/videos" element={<SearchVideos />} />
        <Route path="/explore" element={<Explore />} />

        <Route
  path="/"
  element={
    <div className="app-container">
      <header>
        <div>
          <h1>DID YOU KNOW?</h1>
        </div>
        <div id="arrow-down"></div>
      </header>
      <section className="container-flex">
        <div className="container-child">
          <img alt="Um astronauta flutuando" src="https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FzrbHuADe0oSyiL2XhG4mPA%2Fnormalized.jpg&width=800" />
          <div id="text-whoarewe">
            <h2>Space Travel</h2>
          </div>
        </div>
        <div className="container-child">
          <h4>Astounding Lunar Landing</h4>
          <br /><br />
          {expanded ? (
            <div>
              <p>
                On July 20, 1969, Neil Armstrong became the first human to set foot on the moon during the Apollo 11 mission. His famous words, "That's one small step for man, one giant leap for mankind," echoed across the world. This historic event marked a remarkable achievement for humanity and opened up possibilities for further space exploration. Did you know that Neil Armstrong's iconic footprint remains on the lunar surface? Due to the lack of wind and water erosion on the moon, his footprint and other artifacts from the mission are still intact, preserving a lasting symbol of human accomplishment and the spirit of exploration.
              </p>
              <div className="read-more" onClick={() => setExpanded(false)}>Close</div>
            </div>
          ) : (
            <div>
              <p>
                On July 20, 1969, Neil Armstrong became the first human to set foot on the moon during the Apollo 11 mission. His famous words, "That's one small step for man, one giant leap for mankind," echoed across the world. This historic event marked a remarkable achievement for humanity and opened up possibilities for further space exploration.
              </p>
              <div className="read-more" onClick={() => setExpanded(true)}>Read more...</div>

            </div>
            
            
          )}
        </div>
      </section>
      <Footer/>

    </div>  
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
