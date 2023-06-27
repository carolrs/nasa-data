import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Modal from "react-modal";
import "./VideoSearch.css";

const SearchVideos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (item) => {
    setSelectedVideo(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const searchVideos = async () => {
    if (searchTerm === "") return;

    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${searchTerm}`
      );
      const data = await response.json();

      const videoResults = data.collection.items.filter(
        (item) => item.data[0].media_type === "video"
      );
      const videoResultsWithHref = await Promise.all(
        videoResults.map(async (item) => {
          const videoResponse = await fetch(item.href);
          const videoData = await videoResponse.json();
          item.href = videoData.find((url) => url.includes(".mp4"));
          return item;
        })
      );

      setSearchResults(videoResultsWithHref);
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
          placeholder="Search for videos"
        />
        <button className="search-button" onClick={searchVideos}>
          <FiSearch />
        </button>
      </div>
      <div className="card-container">
        {searchResults.length === 0 ? (
          <p className="no-results"></p>
        ) : (
          searchResults.map((item, index) => (
            <div className="card" key={index}>
              <video
                className="card-background-video"
                src={item.href}
                autoPlay
                loop
                muted
              />
              <div className="card-content">
                <h2>{item.data?.[0]?.title || "Title Not Available"}</h2>
                <p onClick={() => openModal(item)}>View Video</p>
              </div>
            </div>
          ))
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Video Modal"
          style={{
            content: {
              backgroundColor: "black",
              color: "white",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <iframe
            src={selectedVideo?.href}
            title={selectedVideo?.data?.[0]?.title}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ width: "100%", height: "500px" }}
          />
          <h2>{selectedVideo?.data?.[0]?.title}</h2>
          <p>{selectedVideo?.data?.[0]?.description}</p>
          <button className="close-modal" onClick={closeModal}>
            x
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default SearchVideos;
