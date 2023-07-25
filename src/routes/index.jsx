import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import HomePage from "../components/HomePage";
import Wish01 from "../components/Wish/Wish";
import { AnimatePresence } from "framer-motion";
import Aqua from "../components/Aquarium/Aquarium_final";

export default (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <AnimatePresence mode = 'wait'>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="wish/:name" element={<Wish01 />} />
        <Route path="fish" element={<Aqua />} />
        
      </Routes>
      </AnimatePresence>
    </Router>
  );