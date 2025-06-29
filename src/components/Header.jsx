import React from 'react';

function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">TV Shows</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">New & Popular</a></li>
            <li><a href="#">My List</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <i className="fas fa-search"></i>
        <span>Kids</span>
        <i className="fas fa-bell"></i>
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
}

export default Header;