import React, { useEffect } from "react";
import "./Wish.css"; // Import the CSS file with additional styles
import MyNavBar from "../navbar/NavBar";
import Transitions from '../Transition';
import { motion } from "framer-motion";
import data from "../../birthday_wishes_list.json";
import { useParams } from "react-router-dom";

const Wish = ({ name, wish }) => {
  const boxStyle = {
    width: "70%", // Adjust the width as needed
    border: "2px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    margin: "10px auto", // Center the box horizontally
  };
  return (
    <div className="birthday-wish-container">
      <div style={boxStyle} className="birthday-wish-box">
        <p className="birthday-wish-text">{wish}</p>
        <p className="birthday-wish-name">{name}</p>
      </div>
      
    </div>
  );
};


const Wish01 = () => {
  const { name } = useParams();
  const birthdayData = data.wishes.find((wish) => wish.name === name);
  console.log(birthdayData);

  return (

    <div className="app">
      <motion.div
        key="Wish"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <MyNavBar />
        <Wish name={birthdayData.name} wish={birthdayData.message} />
      </motion.div>
    </div>

  );
};

export default Wish01;
