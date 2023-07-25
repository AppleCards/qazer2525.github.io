import React, { useCallback, useEffect } from 'react';
import '../App.css';
import BirthdayWish from './BirthdayWish';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import MyNavBar from "./navbar/NavBar";
import { motion } from "framer-motion"
import data from "../birthday_wishes_list.json";
import Aqua from './Aquarium/Aquarium_final';

const HomePage = ({isVisible}) => {
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
    };

    return (
        <motion.div 
        key = "homepage"
        initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0, transition: { duration: 300 } }}>
            <div className="App" style={{ position: "relative" }}>
                <div style={divStyle} id={"home"}>
                    Happy Birthday Tee Yap!
                </div>
                <MyNavBar />
                <Particles height="100vh" width="100vw" options={particlesConfig} init={particlesInit} />
                <main>
                <div className="empty-box" zIndex = {-40} id = "relax">
                    <Aqua/>
                </div>

                    <div id="wishes">
                        <h1 style={{ color: 'white', fontSize: "75px", marginTop: "50px" }}> {heading}</h1>
                        <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {birthdayWishes.map((name) => (
                                <BirthdayWish key={name} birthday={name} />
                            ))}
                        </section>
                    </div>
                </main>
            </div>
        </motion.div>
    );
}

export default HomePage;