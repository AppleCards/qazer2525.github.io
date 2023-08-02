import React, { useEffect } from "react";
import "./Wish.css"; // Import the CSS file with additional styles
import MyNavBar from "../navbar/NavBar";
import Transitions from '../Transition';
import { motion } from "framer-motion";
import data from "../../birthday_wishes_list.json";
import { useParams } from "react-router-dom";


// Function to update background-size based on aspect ratio
function updateBackgroundSize() {
  const container = document.querySelector('.app');
  const image = document.querySelector('.image-wrapper img');

  // Calculate the aspect ratio of the container
  const containerAspectRatio = container.clientWidth / container.clientHeight;

  // Calculate the aspect ratio of the image
  const imageAspectRatio = image.naturalWidth / image.naturalHeight;
  console.log(imageAspectRatio);
  console.log(containerAspectRatio);
  if (imageAspectRatio  < containerAspectRatio) {
    image.style.objectFit = 'contain';
  } else {
    image.style.objectFit = 'cover';
  }
}

const Wish = ({ name, wish }) => {
  const boxStyle = {
    width: "70%", // Adjust the width as needed
    border: "2px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "rgba(249, 249, 249, 0.75)", // RGBA color with alpha 0.8 for 80% opacity
    margin: "10px auto", // Center the box horizontally

  };
  document.addEventListener('DOMContentLoaded', updateBackgroundSize);

  window.addEventListener('resize', updateBackgroundSize);
  window.addEventListener('load', updateBackgroundSize);
  return (

    <div className="birthday-wish-container">
      <div style={boxStyle} className="birthday-wish-box">
        <p className="birthday-wish-text">{wish}</p>
        <p className="birthday-wish-name">{name}</p>
      </div>
    </div >
  );
};


const Wish01 = () => {
  const { name } = useParams();
  const birthdayData = data.wishes.find((wish) => wish.name === name);

  return (
    <div className="app" >
      <motion.div
          key="Wish"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style = {{
            "position": "absolute", /* Position the wish container absolutely within .app */
            "top": 0,
            "left": 0,
            "width": "100%", /* Make the wish container full-width */
            "height": "100%", /* Make the wish container full-height */
          }}>
      <div class="image-wrapper">
       <img src= {`${birthdayData.image}`} alt="picutre" id="image" onload="updateBackgroundSize()"/>
      </div>
        

          <MyNavBar />
          <Wish name={birthdayData.name} wish={birthdayData.message} />

        </motion.div>
      
    </div>


  );
};

export default Wish01;
