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
import Help from "../components/help/Help";
import Game from "../components/Game/App";
import { store, updateFrame, birdjump, game, states, rungame } from "../components/Game/store/store";


function onpress(evt) {

    switch (game.currentstate) {
    default:
    case states.Splash:
      rungame()
      birdjump(store.bird)
      break
    case states.Game:
      birdjump(store.bird)
      break
    case states.Score:
      break
  }

}
document.addEventListener('mousedown', onpress);


export default (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <AnimatePresence mode = 'wait'>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="wish/:name" element={<Wish01 />} />
        <Route path="game" element={<Game store={store} updateFrame={updateFrame} game={game}/>} />
        <Route path="jesus" element={<Help />} />
        
      </Routes>
      </AnimatePresence>
    </Router>
  );