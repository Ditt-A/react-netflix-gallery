import React from 'react';

function ImageModal({ modalData, onClose }) {
  if (!modalData.isOpen) {
    return null; // Jika tidak terbuka, jangan render apa-apa
  }

  return (
    <div id="image-modal" className="modal" style={{ display: 'flex' }} onClick={onClose}>
      <span className="close-button" onClick={onClose}>&times;</span>
      <img className="modal-content" id="modal-image" src={modalData.imageUrl} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

export default ImageModal;