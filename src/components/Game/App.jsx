import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {bg,fg, bird0, bird1, bird2, pipeN, pipeS, gameover, _ok_, splash, ready} from './common/Sprite';
import {width, height} from './common/common';
import { observer} from 'mobx-react';
import {game, rungame, states} from './store/store';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
const UnclickableDiv = styled.div`
  pointer-events: none;
`;
const SpriteWrapper = observer(
  class SpriteWrapper extends Component {


  render(){
    const gameSprite = this.props.gameSprite;
    const rotate = 'rotate('+ gameSprite.rotation +'rad)'
    const translate = 'translate(' + gameSprite.cx + 'px,' + gameSprite.cy + 'px)'
    const ctrans = (gameSprite.rotation == null) ? translate : translate + ' ' + rotate;
    const onClickHandler = (this.props.onClickHandler) == null ? null : this.props.onClickHandler;
    var style = {
      transform: ctrans,
      position: 'absolute'
    }

    return (
      <div style={style} onClick={onClickHandler}>
        {this.props.children}
      </div>)
  }
})



const Bg = observer(
  class Bg extends Component {
  render(){
      return <SpriteWrapper gameSprite={this.props.bg}> {bg} </SpriteWrapper>;
  }

})

const Fg = observer(
  class Fg extends Component {
  render(){
      return <SpriteWrapper gameSprite={this.props.fg}> {fg} </SpriteWrapper>;
  }

})

export const Bird = observer(
   class Bird extends Component {

      render(){
          let wbird;
          switch(this.props.bird.frame) {
            case 1:
            case 3:
              wbird = bird1
              break
            case 2:
              wbird = bird2
              break
            case 0:
            default:
              wbird = bird0
              break
          }

          return <SpriteWrapper gameSprite={this.props.bird}> {wbird} </SpriteWrapper>;
      }
   }
)

const Pipe = observer(
  class Pipe extends Component {
  render() {
    let wpipe;
    switch(this.props.pipe.type) {
      default:
      case "N":
        wpipe = pipeN
        break
      case "S":
        wpipe = pipeS
        break
    }

    return <SpriteWrapper gameSprite={this.props.pipe}> {wpipe} </SpriteWrapper>;

  }
})

const Gameover = observer(
  class Gameover extends Component {
    
  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 94, cy: height-400}}> {gameover} </SpriteWrapper>;
  }
  
})

export const OK = observer(
  class OK extends Component {
  render()  {
      return <SpriteWrapper gameSprite={{cx: width/2 - 40, cy: height-340}} onClickHandler={rungame} > {_ok_} </SpriteWrapper>;
  }

})

export const Splash = observer(
  class Splash extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 59, cy: height-300}}> {splash} </SpriteWrapper>;
  }

})

export const Ready = observer(
  class Ready extends Component {

  render(){
      return <SpriteWrapper gameSprite={{cx: width/2 - 87, cy: height-380}}> {ready} </SpriteWrapper>;
  }

})



const Game = observer(class App extends Component {
    // Add a property to store the animation frame ID
    animationFrameId = null;
    
    componentDidMount() {
      this.appUpdateFrame();
    }
    componentWillUnmount() {
      // Clear the animation frame when the component is unmounted
      if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId);
      }
    }

  //Call to store to update the frame
  appUpdateFrame = () => {
    // Call requestAnimationFrame and store the returned ID
    this.animationFrameId = window.requestAnimationFrame(this.appUpdateFrame);

    this.props.updateFrame(); // this will trigger MobX to update the view when observable values change
  }
  


  render() {
    const {bgs, fgs, bird, pipes, score} = this.props.store
    const { currentstate } = this.props.game;

    const style = {
      width: width,
      height: height
    }


    return (
      <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: "url('/assets/hollow-knight-god-home.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="App" id="fakingcanvas" style={style} >
      { bgs.map( (bg) => ( <Bg bg={bg} key={bg.id} /> )     )}
      { pipes.map( (pipe) => (  <Pipe pipe={pipe} key={pipe.id} /> )   )}
      <Bird bird={bird} />
      { (currentstate === states.Score) ? <Gameover /> : null }
      { (currentstate === states.Score) ? <OK /> : null }
      { (currentstate === states.Splash) ? <Splash /> : null }
      { (currentstate === states.Splash) ? <Ready /> : null }
      { fgs.map( (fg) => ( <Fg fg={fg} key={fg.id} /> )     )}
      <UnclickableDiv>
        {score / 2}
      </UnclickableDiv>
      </div>
  </div>
  </motion.div>
    );
  }
})

export default Game;
