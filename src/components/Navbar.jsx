import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
      <li><Link to="/stock_price" className="nav-link">Stock Price</Link></li>
        <li><Link to="/stock_history" className="nav-link">Stock History</Link></li>
        <li><Link to="/stock_comparison" className="nav-link">Stock Comparison</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
