import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Explorer.css';

const Explore = () => {
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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=meteor`);
        const data = await response.json();
        setSearchResults(data.collection.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="explore-container">
      <div className="card-container">
        {searchResults.length === 0 ? (
          <p className="no-results"></p>
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
                    <button className="close-modal " onClick={closeModal}>x</button>

          <img src={selectedImage?.links?.[0]?.href} alt={selectedImage?.data?.[0]?.title} />
          <h2>{selectedImage?.data?.[0]?.title}</h2>
          <p>{selectedImage?.data?.[0]?.description}</p>
        </Modal>
      </div>
    </div>
  );
}

export default Explore;
