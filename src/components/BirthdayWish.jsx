import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Thumbnail, LikeButton } from 'react';
import "../BirthdayWish.css"; // Import the CSS file with additional styles
import { Link } from "react-router-dom";


const BirthdayWish = ({ birthday }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const textWidth = textRef.current.scrollWidth;
        const charsInName = birthday.name.length;

        // Calculate the desired font size based on the ratio of characters to container width
        const fontSize = (containerWidth / charsInName) * 0.6; // You can adjust the multiplier (0.6) to control the font size

        // Set a maximum and minimum font size to avoid too drastic changes
        const minFontSize = 27.5;
        const maxFontSize = 40;
        const finalFontSize = Math.min(maxFontSize, Math.max(minFontSize, fontSize));

        textRef.current.style.fontSize = `${finalFontSize}px`;
        
              // Calculate the desired line height based on the font size
      const lineHeight = finalFontSize * 5; // You can adjust the multiplier (1.2) to control the line height

      // Set a maximum line height to prevent it from becoming too large
      const maxLineHeight = 150;
      const minLineHeight = 120;
      const finalLineHeight = Math.min(maxLineHeight, Math.max(minLineHeight, lineHeight));
      textRef.current.style.lineHeight = `${finalLineHeight}px`;
      }
    };

    // Update font size initially and on window resize
    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, [birthday.name]);


  return (

    <div
      ref={containerRef}
      className={`box ${isHovered ? "hovered" : ""}`} // Add "hovered" class when component is hoveredstyle={boxStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      style={{
        "--image-default": `url()`,
        "--image-hover": `url('${birthday.gif}')`,
        margin: '5px', // Adjust the margin as needed
        padding: '20px', // Adjust the padding as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'height: 100vh', // Ensure the height takes up the full space
      }}
    >

      <a href={`wish/${birthday.name}`} style={{ display: "block", width: "100%", height: "100%" }}>
        <h3 ref={textRef}
          style={{
            color: 'white',
            textAlign: 'center',
            margin: '0',
            lineHeight: '3.5', // Adjust the line height to center the text vertically
          }}>
          {birthday.name}</h3>
      </a>
    </div>
  );
};

export default BirthdayWish;