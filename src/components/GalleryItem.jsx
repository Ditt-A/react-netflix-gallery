import React, { useRef } from 'react';

function GalleryItem({ item, onImageClick, onItemEnter }) {
  const itemRef = useRef(null);

  return (
    <div 
      className="gallery-item" 
      ref={itemRef} 
      onMouseEnter={() => onItemEnter(item, itemRef.current)}
    >
      <img src={item.imageUrl} alt={item.title} className="item-img" />
    </div>
  );
}
export default GalleryItem;