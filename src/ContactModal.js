import React from 'react';

const ContactModal = ({ onClose }) => {
   return(
    <>
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="font-bold text-2xl mb-2 lg: text:4xl">Contact Details:</h2>
        <p><a href="https://github.com/carolrs" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        <p><a href="https://www.linkedin.com/in/anacarolrsoares/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>        </div>
      </div>
    </>
   )
    
}

export default ContactModal;