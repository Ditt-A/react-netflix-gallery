import React from 'react';

function Floater({ hoveredItem, onImageClick }) {
  if (!hoveredItem) {
    return null; // Jika tidak ada item yang di-hover, jangan tampilkan apa-apa
  }

  const { item, rect } = hoveredItem;
  const isContinueWatching = !!item.progress;

  // Style untuk memposisikan floater tepat di atas placeholder
  const style = {
    position: 'fixed', // Mengambang di atas segalanya
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };

  return (
    <div className="floater-container" style={style}>
      <div className="item-floater">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="item-img" 
          onClick={() => onImageClick(item.imageUrl)}
        />
        <div className="item-details">
          <div className="item-buttons">
            <div className="buttons-left">
              <span className="btn-icon"><i className="fas fa-play"></i></span>
              <span className="btn-icon"><i className="fas fa-plus"></i></span>
              <span className="btn-icon"><i className="fas fa-times"></i></span>
              <span className="btn-icon"><i className="far fa-thumbs-up"></i></span>
            </div>
            <div className="buttons-right">
              <span className="btn-icon"><i className="fas fa-chevron-down"></i></span>
            </div>
          </div>
          <div className="item-info">
            <p className="photo-title">{item.title}</p>
            <span className="photo-meta">{item.meta}</span>
          </div>
        </div>
        {isContinueWatching && (
          <div className="progress-bar">
            <div className="progress" style={{ width: item.progress }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Floater;