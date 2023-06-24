import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Modal from 'react-modal';
import './Search.css';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (item) => {
    setSelectedImage(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
              <img
                src={item.links?.[0]?.href}
                alt={item.data?.[0]?.title}
                onClick={() => openModal(item)}
              />
            </div>
          ))
        )}
        <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Image Modal"
  style={{
    content: {
      backgroundColor: 'black',
      color: 'white' 
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)' 
    }
  }}
>
  <img src={selectedImage?.links?.[0]?.href} alt={selectedImage?.data?.[0]?.title} />
  <h2>{selectedImage?.data?.[0]?.title}</h2>
  <p>{selectedImage?.data?.[0]?.description}</p>
  <button onClick={closeModal} style={{color: 'black', backgroundColor: 'white'}}>Close</button>
</Modal>
      </div>
    </div>
  );
};

export default Search;
