import React from 'react';

function Floater({ hoveredData, onImageClick, onInteraction }) {
  // hoveredData sekarang adalah objek { item, rect }
  if (!hoveredData.item) {
    return null;
  }

  const { item, rect } = hoveredData;
  const isContinueWatching = !!item.progress;

  const style = {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transformOrigin: 'center center',
  };

  return (
    <div className="floater-container is-visible" style={style} {...onInteraction}>
      <div className="item-floater">
        <img src={item.imageUrl} alt={item.title} className="item-img" onClick={() => onImageClick(item.imageUrl)} />
        <div className="item-details">
            <div className="buttons-left"><span className="btn-icon"><i className="fas fa-play"></i></span><span className="btn-icon"><i className="fas fa-plus"></i></span><span className="btn-icon"><i className="fas fa-times"></i></span><span className="btn-icon"><i className="far fa-thumbs-up"></i></span></div>
            <div className="buttons-right"><span className="btn-icon"><i className="fas fa-chevron-down"></i></span></div>
        </div>
        <div className="item-info">
            <p className="photo-title">{item.title}</p>
            <span className="photo-meta">{item.meta}</span>
        </div>
        {isContinueWatching && (<div className="progress-bar"><div className="progress" style={{ width: item.progress }}></div></div>)}
      </div>
    </div>
  );
}
export default Floater;