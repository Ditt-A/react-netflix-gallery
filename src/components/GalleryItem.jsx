import React, { useRef } from 'react';

function GalleryItem({ item, onImageClick, onItemEnter }) {
  // useRef digunakan untuk mendapatkan referensi ke elemen div utama
  const itemRef = useRef(null);

  return (
    // Container utama untuk satu item, yang akan dideteksi oleh hover
    <div 
      className="gallery-item" 
      ref={itemRef} 
      onMouseEnter={() => onItemEnter(item, itemRef.current)}
      // Saat mouse masuk, panggil fungsi onItemEnter yang dikirim dari App.jsx
      // Kita kirim data 'item' dan referensi elemennya 'itemRef.current'
    >
      {/* Ini adalah gambar placeholder yang selalu terlihat */}
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="item-img" 
        // Kita pindahkan onClick ke Floater agar lebih konsisten
      />
    </div>
  );
}

export default GalleryItem;