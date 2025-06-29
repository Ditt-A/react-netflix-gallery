// src/App.jsx (VERSI DIPERBAIKI)
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import GalleryRow from './components/GalleryRow';
import Floater from './components/Floater';
import ImageModal from './components/ImageModal';
import './App.css';

// --- DATABASE FOTO SEMENTARA ---
const loveTheseData = [
  { id: 'p1', imageUrl: 'images/Pretty/Foto1.jpg', title: 'Selfie 1', meta: 'Beauty' },
  { id: 'p2', imageUrl: 'images/Pretty/Foto2.jpg', title: 'Selfie 2', meta: 'Casual' },
  { id: 'p3', imageUrl: 'images/Pretty/Foto3.jpg', title: 'Selfie 3', meta: 'Outdoor' },
  { id: 'p4', imageUrl: 'images/Pretty/Foto4.jpg', title: 'Selfie 4', meta: 'Indoor' },
  { id: 'p5', imageUrl: 'images/Pretty/Foto5.jpg', title: 'Selfie 5', meta: 'Event' },
  { id: 'p6', imageUrl: 'images/Pretty/Foto6.jpg', title: 'Selfie 6', meta: 'Holiday' },
  { id: 'p7', imageUrl: 'images/Pretty/Foto7.jpg', title: 'Selfie 7', meta: 'Random' },
  { id: 'p8', imageUrl: 'images/Pretty/Foto8.jpg', title: 'Selfie 8', meta: 'Vintage' },
];
const continueData = [
    { id: 'c1', imageUrl: 'images/Cute/Foto2.jpg', title: 'Pose Lucu', meta: 'Progress: 67%', progress: '67%' },
    { id: 'c2', imageUrl: 'images/Cute/Foto1.jpg', title: 'Main Laptop', meta: 'Progress: 31%', progress: '31%' },
];
const top10Data = [
    { id: 't1', rank: 1, imageUrl: 'images/Potrait/Foto1.jpg', title: 'Top Photo 1' },
    { id: 't2', rank: 2, imageUrl: 'images/Potrait/Foto2.jpg', title: 'Top Photo 2' },
    { id: 't3', rank: 3, imageUrl: 'images/Potrait/Foto3.jpg', title: 'Top Photo 3' },
];

function App() {
  const [modalData, setModalData] = useState({ isOpen: false, imageUrl: '' });
  const [hoveredItem, setHoveredItem] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setHoveredItem(null);
    setModalData({ isOpen: true, imageUrl: imageUrl });
  };
  const handleCloseModal = () => setModalData({ isOpen: false, imageUrl: '' });

  const cancelHide = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const handleItemEnter = useCallback((item, element) => {
    cancelHide();
    const rect = element.getBoundingClientRect();
    setHoveredItem({ item, rect });
  }, [cancelHide]);
  
  const handleRowLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  }, []);
  
  return (
    <>
      <Header />
      <main>
        <GalleryRow title="We Think You'll Love These" items={loveTheseData} onImageClick={handleImageClick} onItemEnter={handleItemEnter} onRowLeave={handleRowLeave} />
        <GalleryRow title="Continue Your Gallery" items={continueData} onImageClick={handleImageClick} onItemEnter={handleItemEnter} onRowLeave={handleRowLeave} />
        <GalleryRow title="Top 10 Photos in Indonesia Today" items={top10Data} type="top10" onImageClick={handleImageClick} />
      </main>

      {/* Kirim fungsi cancelHide ke Floater */}
      <Floater 
        hoveredItem={hoveredItem} 
        onImageClick={handleImageClick}
        onMouseEnter={cancelHide} 
      />
      
      <ImageModal modalData={modalData} onClose={handleCloseModal} />
    </>
  );
}

export default App;