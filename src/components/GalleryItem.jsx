import React, { useRef } from 'react';

function GalleryItem({ item, onItemHover }) {
  const itemRef = useRef(null);

  // Saat mouse masuk, kirim DATA ITEM dan juga REFERENSI ELEMEN-nya
  const handleMouseEnter = () => {
    if (onItemHover && itemRef.current) {
      onItemHover(item, itemRef.current);
    }
  };

  return (
    <div 
      className="gallery-item" 
      ref={itemRef} 
      onMouseEnter={handleMouseEnter}
    >
      <img src={item.imageUrl} alt={item.title} className="item-img" />
    </div>
  );
}

export default GalleryItem;