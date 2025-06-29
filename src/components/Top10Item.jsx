import React from 'react';

function Top10Item({ item, onImageClick }) {
  return (
    <div className="top10-item">
      <span className="top10-number">{item.rank}</span>
      <div className="top10-poster">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="item-img" 
          onClick={() => onImageClick(item.imageUrl)} 
        />
      </div>
    </div>
  );
}
export default Top10Item;