import React from 'react';
import './Landing.css'; 
import Navbar from './Navbar';
function Landing() {
  return (
    <div>
       <Navbar/>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Stock Analyser</h1>
          <p>We provide amazing products and services regarding stock prices!</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
