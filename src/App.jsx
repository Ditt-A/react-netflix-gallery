import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import GalleryRow from './components/GalleryRow';
import Floater from './components/Floater';
import ImageModal from './components/ImageModal';
import './App.css';

// --- DATABASE FOTO SEMENTARA (SUDAH DIPERBARUI) ---
const loveTheseData = [
  { id: 'p1', imageUrl: 'images/Pretty/Foto1.jpg', title: 'Senyum Paling Manis', meta: 'Fav Series' },
  { id: 'p2', imageUrl: 'images/Pretty/Foto2.jpg', title: 'Pose Andalan', meta: 'Cute as Always' },
  { id: 'p3', imageUrl: 'images/Pretty/Foto3.jpg', title: 'WARNING:DANGER', meta: 'Too much beauty' },
  { id: 'p4', imageUrl: 'images/Pretty/Foto4.jpg', title: 'huft betmut', meta: 'Cemberutnya aja cantik' },
  { id: 'p5', imageUrl: 'images/Pretty/Foto5.jpg', title: 'Red Carpet', meta: 'Selalu jadi perhatian utama' },
  { id: 'p6', imageUrl: 'images/Pretty/Foto6.jpg', title: 'My Private Light', meta: 'menyinari hariku yang kosong ini' },
  { id: 'p7', imageUrl: 'images/Pretty/Foto7.jpg', title: 'Dialog Lewat Mata', meta: 'cukup liat matanya untuk tau segalanya' },
  { id: 'p8', imageUrl: 'images/Pretty/Foto8.jpg', title: 'Cantik Tanpa Skenario', meta: 'Jadi Pemandangan Favorit tanpa perlu bukti' },
];

const continueData = [
    { id: 'c1', imageUrl: 'images/Cute/Foto1.jpg', title: 'Spesies Langka: Human Kebab', meta: 'Hanya muncul saat cuaca dingin atau lagi mager. Sangat jinak and cute', progress: '67%' },
    { id: 'c2', imageUrl: 'images/Cute/Foto2.jpg', title: 'Standar Cantikku', meta: 'My own standard for beauty', progress: '31%' },
    { id: 'c3', imageUrl: 'images/Cute/Foto3.jpg', title: 'Definisi Kata "Gemes"', meta: 'Selalu pengen unyel2 pipinya', progress: '80%' },
    { id: 'c4', imageUrl: 'images/Cute/Foto4.jpg', title: 'Sok Serius, Tapi Lucu', meta: 'fokus aja keliatan gemes banget', progress: '15%' },
    { id: 'c5', imageUrl: 'images/Cute/Foto5.jpg', title: 'Serangan Udara Jarak Jauh', meta: 'Dari jauh udah, ditunggu secara langsungnya', progress: '50%' },
    { id: 'c6', imageUrl: 'images/Cute/Foto6.jpg', title: 'Jurus Paling Ampuh: Cemberut', meta: 'Peringatan: Jurus ini bisa meluluhkan pertahanan apapun dan membuat permintaan apapun dikabulkan', progress: '90%' },
    { id: 'c7', imageUrl: 'images/Cute/Foto7.jpg', title: 'Aset Paling Berharga: Pipi Bakpao', meta: 'Nominasi Pipi Paling Menggemaskan tahun ini. Pemenangnya sudah jelas, kan?', progress: '45%' },
    { id: 'c8', imageUrl: 'images/Cute/Foto8.jpg', title: 'Nominasi Tergemes', meta: 'AAAAAAA INI GEMES BANGET GA BOONG', progress: '22%' },
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

  // FUNGSI BARU: Dipanggil secara spesifik saat mouse menyentuh tombol panah
  const handleArrowHover = useCallback(() => {
    cancelHide(); // Batalkan semua timer untuk menyembunyikan
    setHoveredData({ item: null, rect: null }); // Hapus data hover, sehingga floater hilang
  }, [cancelHide]);

  const onRowInteraction = { onMouseEnter: cancelHide, onMouseLeave: scheduleHide };

  return (
    <>
      <Header />
      <main>
        <GalleryRow title="Photos I found pretty" items={loveTheseData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={onRowInteraction} isActive={activeRow === "Photos I found pretty"} onArrowHover={handleArrowHover} />
        <GalleryRow title="Gallery of Cute" items={continueData} onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={onRowInteraction} isActive={activeRow === "Gallery of Cute"} onArrowHover={handleArrowHover} />
        <GalleryRow title="Potrait of the Day" items={top10Data} type="top10" onImageClick={handleImageClick} onItemHover={handleItemHover} onRowInteraction={onRowInteraction} isActive={activeRow === "Potrait of the Day"} onArrowHover={handleArrowHover}/>
      </main>

      <Floater hoveredData={hoveredData} onImageClick={handleImageClick} onInteraction={onRowInteraction} />
      <ImageModal modalData={modalData} onClose={handleCloseModal} />
    </>
  );
}
export default App;