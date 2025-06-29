import React, { useRef } from 'react';
import GalleryItem from './GalleryItem';
import Top10Item from './Top10Item';

// Menerima semua props yang dibutuhkan dari App.jsx
function GalleryRow({ title, items, type = 'standard', onImageClick, onItemEnter, onRowLeave, isActive }) {
  
  // useRef untuk mengontrol elemen div yang bisa di-scroll
  const galleryRowRef = useRef(null);

  // Fungsi internal untuk meng-handle klik panah
  const handleScroll = (direction) => {
    if (galleryRowRef.current) {
      const { clientWidth } = galleryRowRef.current;
      const scrollAmount = clientWidth * 0.8;
      
      galleryRowRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const isTop10 = type === 'top10';

  return (
    <section className="category-row">
      <h2>{title}</h2>
      
      {/* Wrapper ini akan mendapat class 'arrows-visible' jika baris ini aktif */}
      <div className={`gallery-wrapper ${isActive ? 'arrows-visible' : ''}`} onMouseLeave={onRowLeave}>

        <button className="scroll-arrow arrow-left" aria-label="Scroll Left" onClick={() => handleScroll('left')}>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className={`gallery-row ${isTop10 ? 'top10-row' : ''}`} ref={galleryRowRef}>
          
          {/* Logika untuk me-render daftar item */}
          {items.map((item) => (
            isTop10 ? (
              // Jika ini baris Top 10
              <Top10Item 
                key={item.id} 
                item={item} 
                onImageClick={onImageClick} 
              />
            ) : (
              // Jika ini baris standar
              <GalleryItem 
                key={item.id} 
                item={item} 
                onImageClick={onImageClick}
                // Teruskan event handler dari App.jsx ke setiap GalleryItem
                onItemEnter={onItemEnter}
              />
            )
          ))}
        </div>

        <button className="scroll-arrow arrow-right" aria-label="Scroll Right" onClick={() => handleScroll('right')}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

export default GalleryRow;