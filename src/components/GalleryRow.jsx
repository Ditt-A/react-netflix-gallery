import React, { useRef } from 'react';
import GalleryItem from './GalleryItem';
import Top10Item from './Top10Item';

// Terima prop 'onArrowHover' yang baru
function GalleryRow({ title, items, type = 'standard', onImageClick, onItemHover, onRowInteraction, isActive, onArrowHover }) {
  const galleryRowRef = useRef(null);

  const handleScroll = (direction) => {
    if (!galleryRowRef.current) return;
    const { clientWidth } = galleryRowRef.current;
    galleryRowRef.current.scrollBy({
      left: direction === 'right' ? clientWidth * 0.9 : -clientWidth * 0.9,
      behavior: 'smooth'
    });
  };

  const isTop10 = type === 'top10';
  const rowEventHandlers = !isTop10 ? onRowInteraction : {};

  return (
    <section className="category-row">
      <h2>{title}</h2>
      <div className={`gallery-wrapper ${isActive ? 'arrows-visible' : ''}`} {...rowEventHandlers}>
        
        {/* Tombol panah sekarang memiliki onMouseEnter yang memanggil onArrowHover */}
        <button 
          className="scroll-arrow arrow-left" 
          aria-label="Scroll Left" 
          onClick={() => handleScroll('left')} 
          onMouseEnter={!isTop10 ? onArrowHover : null}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className={`gallery-row ${isTop10 ? 'top10-row' : ''}`} ref={galleryRowRef}>
          {items.map((item) => (
            isTop10 ? (
              <Top10Item key={item.id} item={item} onImageClick={onImageClick} />
            ) : (
              <GalleryItem 
                key={item.id} 
                item={item} 
                onItemHover={(itemData, element) => onItemHover(itemData, element, title)} 
              />
            )
          ))}
        </div>

        <button 
          className="scroll-arrow arrow-right" 
          aria-label="Scroll Right" 
          onClick={() => handleScroll('right')} 
          onMouseEnter={!isTop10 ? onArrowHover : null}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
export default GalleryRow;