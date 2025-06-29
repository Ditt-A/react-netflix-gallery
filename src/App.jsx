import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import GalleryRow from './components/GalleryRow';
import Floater from './components/Floater';
import ImageModal from './components/ImageModal';
import './App.css';

// --- DATABASE FOTO SEMENTARA (SUDAH DIPERBARUI) ---
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
    { id: 'c1', imageUrl: 'images/Cute/Foto1.jpg', title: 'Pose Lucu', meta: 'Progress: 67%', progress: '67%' },
    { id: 'c2', imageUrl: 'images/Cute/Foto2.jpg', title: 'Main Laptop', meta: 'Progress: 31%', progress: '31%' },
    { id: 'c3', imageUrl: 'images/Cute/Foto3.jpg', title: 'Lihat Jendela', meta: 'Progress: 80%', progress: '80%' },
    { id: 'c4', imageUrl: 'images/Cute/Foto4.jpg', title: 'Selfie Indoor', meta: 'Progress: 15%', progress: '15%' },
    { id: 'c5', imageUrl: 'images/Cute/Foto5.jpg', title: 'Gaya Keren', meta: 'Progress: 50%', progress: '50%' },
    { id: 'c6', imageUrl: 'images/Cute/Foto6.jpg', title: 'Random Cute', meta: 'Progress: 90%', progress: '90%' },
    { id: 'c7', imageUrl: 'images/Cute/Foto7.jpg', title: 'Candid', meta: 'Progress: 45%', progress: '45%' },
    { id: 'c8', imageUrl: 'images/Cute/Foto8.jpg', title: 'Foto Artistik', meta: 'Progress: 22%', progress: '22%' },
];

const top10Data = [
    { id: 't1', rank: 1, imageUrl: 'images/Potrait/Foto1.jpg', title: 'Top Photo 1' },
    { id: 't2', rank: 2, imageUrl: 'images/Potrait/Foto2.jpg', title: 'Top Photo 2' },
    { id: 't3', rank: 3, imageUrl: 'images/Potrait/Foto3.jpg', title: 'Top Photo 3' },
    { id: 't4', rank: 4, imageUrl: 'images/Potrait/Foto4.jpg', title: 'Top Photo 4' },
    { id: 't5', rank: 5, imageUrl: 'images/Potrait/Foto5.jpg', title: 'Top Photo 5' },
    { id: 't6', rank: 6, imageUrl: 'images/Potrait/Foto6.jpg', title: 'Top Photo 6' },
    { id: 't7', rank: 7, imageUrl: 'images/Potrait/Foto7.jpg', title: 'Top Photo 7' },
    { id: 't8', rank: 8, imageUrl: 'images/Potrait/Foto8.jpg', title: 'Top Photo 8' },
];


function App() {
  const [modalData, setModalData] = useState({ isOpen: false, imageUrl: '' });
  const [hoveredData, setHoveredData] = useState({ item: null, rect: null });
  const [activeRow, setActiveRow] = useState(null);
  const hideTimeoutRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setHoveredData({ item: null, rect: null });
    setActiveRow(null);
    setModalData({ isOpen: true, imageUrl });
  };
  const handleCloseModal = () => setModalData({ isOpen: false, imageUrl: '' });

  const cancelHide = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredData({ item: null, rect: null });
      setActiveRow(null);
    }, 300);
  }, [cancelHide]);

  const handleItemHover = useCallback((item, element, rowTitle) => {
    cancelHide();
    if (item && element) {
      const rect = element.getBoundingClientRect();
      setHoveredData({ item, rect });
      setActiveRow(rowTitle);
    }
  }, [cancelHide]);

  const handleArrowHover = useCallback(() => {
    cancelHide();
    setHoveredData({ item: null, rect: null });
  }, [cancelHide]);

  const onRowInteraction = { onMouseEnter: cancelHide, onMouseLeave: scheduleHide };

  return (
    <>
      <Header />
      <main>
        <GalleryRow title="We Think You'll Love These" items={loveTheseData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={onRowInteraction} isActive={activeRow === "We Think You'll Love These"} onArrowHover={handleArrowHover} />
        <GalleryRow title="Continue Your Gallery" items={continueData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={onRowInteraction} isActive={activeRow === "Continue Your Gallery"} onArrowHover={handleArrowHover} />
        <GalleryRow title="Top 10 Photos in Indonesia Today" items={top10Data} type="top10" onImageClick={handleImageClick} />
      </main>

      <Floater hoveredData={hoveredData} onImageClick={handleImageClick} onInteraction={onRowInteraction} />
      <ImageModal modalData={modalData} onClose={handleCloseModal} />
    </>
  );
}

export default App;