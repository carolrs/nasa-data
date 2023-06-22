import React from 'react';

const AboutModal = ({ onClose }) => (
  <div className="modal" style={{ backgroundImage: "url('https://cdnm.westwing.com.br/glossary/uploads/br/2021/05/17215012/Arte-Renascentista.jpg')" }}>
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h2 className="font-bold text-2xl mb-4 lg: text:4xl">About this App</h2>
      <p>This is an Art Exhibition app that allows users to search for artworks in Rijksmuseum using any search term. Users can also view the details of each artwork.</p>
    </div>
  </div>
);

export default AboutModal;
