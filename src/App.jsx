import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import GalleryRow from './components/GalleryRow';
import Floater from './components/Floater';
import ImageModal from './components/ImageModal';
import './App.css';

// --- DATABASE FOTO SEMENTARA ---
const loveTheseData = [ { id: 'p1', imageUrl: 'images/Pretty/Foto1.jpg', title: 'Selfie 1', meta: 'Beauty' }, { id: 'p2', imageUrl: 'images/Pretty/Foto2.jpg', title: 'Selfie 2', meta: 'Casual' }, { id: 'p3', imageUrl: 'images/Pretty/Foto3.jpg', title: 'Selfie 3', meta: 'Outdoor' }, { id: 'p4', imageUrl: 'images/Pretty/Foto4.jpg', title: 'Selfie 4', meta: 'Indoor' }, { id: 'p5', imageUrl: 'images/Pretty/Foto5.jpg', title: 'Selfie 5', meta: 'Event' }, { id: 'p6', imageUrl: 'images/Pretty/Foto6.jpg', title: 'Selfie 6', meta: 'Holiday' }, { id: 'p7', imageUrl: 'images/Pretty/Foto7.jpg', title: 'Selfie 7', meta: 'Random' }, { id: 'p8', imageUrl: 'images/Pretty/Foto8.jpg', title: 'Selfie 8', meta: 'Vintage' },];
const continueData = [ { id: 'c1', imageUrl: 'images/Cute/Foto2.jpg', title: 'Pose Lucu', meta: 'Progress: 67%', progress: '67%' }, { id: 'c2', imageUrl: 'images/Cute/Foto1.jpg', title: 'Main Laptop', meta: 'Progress: 31%', progress: '31%' },];
const top10Data = [ { id: 't1', rank: 1, imageUrl: 'images/Potrait/Foto1.jpg', title: 'Top Photo 1' }, { id: 't2', rank: 2, imageUrl: 'images/Potrait/Foto2.jpg', title: 'Top Photo 2' }, { id: 't3', rank: 3, imageUrl: 'images/Potrait/Foto3.jpg', title: 'Top Photo 3' },];

function App() {
  const [modalData, setModalData] = useState({ isOpen: false, imageUrl: '' });
  const [hoveredData, setHoveredData] = useState({ item: null, rect: null });
  const [activeRow, setActiveRow] = useState(null);
  const hideTimeoutRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setHoveredData({ item: null, rect: null });
    setModalData({ isOpen: true, imageUrl });
  };
  const handleCloseModal = () => setModalData({ isOpen: false, imageUrl: '' });

  const cancelHide = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
  }, []);

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredData({ item: null, rect: null });
      setActiveRow(null);
    }, 300);
  }, [cancelHide]);

  // Fungsi ini sekarang menerima semua data yang dibutuhkan
  const handleItemHover = useCallback((item, element, rowTitle) => {
    cancelHide();
    if (item && element) {
      const rect = element.getBoundingClientRect();
      setHoveredData({ item, rect });
      setActiveRow(rowTitle);
    }
  }, [cancelHide]);

  return (
    <>
      <Header />
      <main>
        <GalleryRow title="We Think You'll Love These" items={loveTheseData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={{ onMouseEnter: cancelHide, onMouseLeave: scheduleHide }} isActive={activeRow === "We Think You'll Love These"} />
        <GalleryRow title="Continue Your Gallery" items={continueData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={{ onMouseEnter: cancelHide, onMouseLeave: scheduleHide }} isActive={activeRow === "Continue Your Gallery"} />
        <GalleryRow title="Top 10 Photos in Indonesia Today" items={top10Data} type="top10" onImageClick={handleImageClick} />
      </main>
      
      {/* Floater menerima data dan event handler */}
      <Floater hoveredData={hoveredData} onImageClick={handleImageClick} onInteraction={{ onMouseEnter: cancelHide, onMouseLeave: scheduleHide }} />
      <ImageModal modalData={modalData} onClose={handleCloseModal} />
    </>
  );
}

export default App;