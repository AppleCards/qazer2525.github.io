import React, { useCallback, useEffect, useState } from 'react';
import '../App.css';
import BirthdayWish from './BirthdayWish';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import MyNavBar from "./navbar/NavBar";
import { motion } from "framer-motion"
import data from "../birthday_wishes_list.json";
import Aqua from './Aquarium/Aquarium_final';
import MyCarousal from './carousal/carousal';
import MyTitleMessage from "./titlemessage/title-message.component";
import { ThemeProvider } from 'styled-components';
import { particlesOptions } from "./particlesOptions";
import theme from './theme';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';


const useFadeInView = (threshold = 0.2, rootMargin = '0px') => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, inView] = useInView({ threshold, rootMargin });

    useEffect(() => {
        setIsVisible(inView); // Set isVisible to inView value
  }, [inView]);

    return { isVisible, ref };
};

const HomePage = ({ isVisible }) => {
    const birthdayWishes = data.wishes;
    const particlesInit = useCallback(async (engine) => {
        await loadFireflyPreset(engine);
    }, []);

    const particlesConfig = {
        preset: "firefly",
    }

    const count = birthdayWishes.length;
    let heading = "0 Birthday Wishe";
    if (count > 0) {
        const noun = count > 1 ? 'Birthday Wishes' : 'Birthday Wish';
        heading = count + ' ' + noun;
    }

    // Use state variables to track visibility
    // Add more state variables for other divs if needed

    // Set the threshold for visibility
    const inViewOptions = {
        threshold: 0.2, // Adjust the threshold as needed (0.2 means 20% of the element must be visible)
        rootMargin: '0px 0px -100px 0px', // Adjust rootMargin as needed
    };
    // Use the useInView hook to track visibility
    const { isVisible: isDiv0Visible, ref: div0Ref } = useFadeInView();
    const { isVisible: isDiv1Visible, ref: div1Ref } = useFadeInView();
    const { isVisible: isDiv2Visible, ref: div2Ref } = useFadeInView();
    // Add more ref and inView variables for other divs if needed

    const divStyle = {
        backgroundImage: "url('/assets/hollow-knight-god-home.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "30px",
        textAlign: "center",
        fontSize: "50px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        backgroundColor: "transparent",
        position: "relative",
        opacity: isDiv0Visible ? 1 : 0,
        transition: 'opacity 0.5s ease'
    };
    const transitionstyle = {
        opacity: isDiv2Visible ? 1 : 0,
        transition: 'opacity 0.5s ease'
    };
    const navigate = useNavigate();
    const [enteredText, setEnteredText] = useState('');
    // 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter'
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase(); // Convert to lowercase for case-insensitivity
            if (key === 'enter') {
                // If space is pressed, check if entered text is "flappybird"
                if (enteredText === 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba') {
                    navigate('game');
                }

                // Reset the entered text after processing the input
                setEnteredText('');
            } else {
                if (`${enteredText}${key}` === 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter'){
                    navigate('game');
                }
                // Check if entered text plus the new character forms "flappybird"
                else if ('arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightbaenter'.startsWith(`${enteredText}${key}`)) {
                    setEnteredText((prevText) => prevText + key);
                } else {
                    // Reset the entered text if it doesn't match "flappybird"
                    setEnteredText('');
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [enteredText, navigate]);


    return (
        <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 300 } }}>
            <div className="App" style={{ position: "relative" }}>
                <div style={divStyle} id={"home"} ref={div0Ref} >
                    Happy Birthday Tee Yap!
                </div>
                <MyNavBar />
                <Particles height="100vh" width="100vw" options={particlesConfig} init={particlesInit} />
                <main>
                    <div id="card" ref={div1Ref} style={{
                        opacity: isDiv1Visible ? 1 : 0,
                        transition: 'opacity 0.5s ease'
                    }}>
                        <ThemeProvider theme={theme}>
                            <MyTitleMessage />
                        </ThemeProvider>
                        <MyCarousal />
                    </div>

                    <div id="wishes" ref={div2Ref} style={transitionstyle}>
                        <h1 style={{
                            color: 'white', fontSize: "75px", marginTop: "50px", opacity: isDiv2Visible ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                        }}> {heading}</h1>
                        <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {birthdayWishes.map((name) => (
                                <BirthdayWish key={name} birthday={name} />
                            ))}
                        </section>
                    </div>
                    <div className="empty-box" zIndex={-40} id="relax">
                        <Aqua />
                    </div>
                </main>
            </div>
        </motion.div>
    );
}

export default HomePage;