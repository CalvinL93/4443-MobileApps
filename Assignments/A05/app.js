import React from 'react';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <img
        className="homepage-image"
        src="your_image_url_here"
        alt="Homepage"
      />
      <div className="button-container">
        <button className="homepage-button">Sign Up</button>
        <button className="homepage-button">Home</button>
        <button className="homepage-button">Log In</button>
      </div>
    </div>
  );
};

export default Homepage;