import React, { useRef } from 'react';
import GalleryItem from './GalleryItem';
import Top10Item from './Top10Item';

function GalleryRow({ title, items, type = 'standard', onImageClick, onItemEnter, onRowLeave }) {
  const galleryRowRef = useRef(null);

  const handleScroll = (direction) => {
    // ... (fungsi scroll tetap sama)
    if(galleryRowRef.current) {
        const { clientWidth } = galleryRowRef.current;
        const scrollAmount = clientWidth * 0.8;
        galleryRowRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const isTop10 = type === 'top10';

  return (
    <section className="category-row">
      <h2>{title}</h2>
      <div className="gallery-wrapper" onMouseLeave={onRowLeave}> {/* <-- Event untuk menyembunyikan floater */}
        <button className="scroll-arrow arrow-left" onClick={() => handleScroll('left')}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className={`gallery-row ${isTop10 ? 'top10-row' : ''}`} ref={galleryRowRef}>
          {items.map((item) => (
            isTop10 ? (
              <Top10Item key={item.id} item={item} onImageClick={onImageClick} />
            ) : (
              <GalleryItem key={item.id} item={item} onImageClick={onImageClick} onItemEnter={onItemEnter} />
            )
          ))}
        </div>
        <button className="scroll-arrow arrow-right" onClick={() => handleScroll('right')}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
export default GalleryRow;