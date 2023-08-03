import React, { useState, useEffect } from "react";
import "./Help.css"; // Import a separate CSS file for styling if needed
import MyNavbar from "../navbar/NavBar";
import { motion } from "framer-motion";

import Carousel from "react-bootstrap/Carousel";
import "../carousal/my-carousal.styles.css";

const MyCarousal2 = ({ shouldApplyparticles }) => {
  return (
    <div id="slides" className="carousel-container2" style={{ zIndex: -1 }}>
      <Carousel controls={false}
        indicators
        interval={2500}
        pause={false}
        fade  // Add the fade property to enable the fade effect
        nextLabel=""
        prevLabel="" className="carousel-container">
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/jesus1.jpg'} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/jesus2.webp'} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/jesus3.jpg'} alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};



const Help = () => {
  const words = ["The LORD is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters. He restores my soul; He leads me in the paths of righteousness For His name’s sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil; For You are with me; Your rod and Your staff, they comfort me. You prepare a table before me in the presence of my enemies; You anoint my head with oil; My cup runs over. Surely goodness and mercy shall follow me All the days of my life; And I will dwell in the house of the LORD Forever.",
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    '"Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go."',
    "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.",
    '"I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth."'
  ];

  const verse = ["Psalms 23:1-6",
    "Philippians 4:6–7",
    "Joshua 1:9",
    "Proverbs 3:5–6",
    "Psalm 121:1-2"

  ]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextWord, setShowNextWord] = useState(false);


  const handleWordChange = () => {
    setShowNextWord(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setShowNextWord(false);
    }, 500); // Transition duration (adjust as needed)
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Call the handleResize function on initial render and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFontSize = () => {
    if (windowWidth < 576) {
      return "16px"; // Small screens, set font size to 16px
    } else if (windowWidth < 768) {
      return "20px"; // Medium screens, set font size to 18px
    } else {
      return "28px"; // Large screens, set font size to 20px
    }
  };

  return (
    <motion.div key="help"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 300 } }}>

      <div className="page-container" onClick={handleWordChange}
      >
        <MyCarousal2 />
        <MyNavbar />
        <div className="word-container" >
          <h1
            className={showNextWord ? "transition-text" : ""}
            style={{ fontSize: getFontSize() }} // Dynamic font size based on window width
          >
            {words[currentIndex]}
          </h1>
          <h1
            className={showNextWord ? "transition-text" : ""}
            style={{ fontSize: getFontSize() }} // Dynamic font size based on window width
          >
            {verse[currentIndex]}
          </h1>
        </div>
      </div>

    </motion.div>
  );
};

export default Help;