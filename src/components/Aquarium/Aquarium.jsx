import React, { Component } from 'react';
import Fish from './Fish'
import './style.css';
import WaterWave from 'react-water-wave';
import image from "./giphy.gif";

async function checkURLValidity(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok; // Returns true if status code is 200-299, indicating a valid URL
  } catch (error) {
    return false; // URL is invalid or inaccessible
  }
}

class Aquarium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }
  async componentDidMount() {
    const isValidURL = await checkURLValidity('/assets/giphy.gif');
    console.log(image); // /logo.84287d09.png
    if (!isValidURL) {
      // URL is invalid or inaccessible, handle the case here
      console.log('Invalid URL');
    }
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());


  }

  handleResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleResize());
  }


  render() {
    return (
      <div className="aquarium-container"> {/* Add a class name to the outer div */}
      <WaterWave
        className="wavestyle" 
        resolution = {1080}// Use the class name here
      >
        {methods => (
        <div>
        <h1 style={{ color: "white" }}>Chill Time</h1>
        {/* <div className='water' style={{ ...this.state, zIndex:1 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 5 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 10 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 15 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 20 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 25 }}></div>
      <div className='water' style={{ ...this.state, zIndex: 30}}></div> */}


        <Fish image='/assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-10.gif' size = {2}/>
        <Fish image='./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-19.gif' size = {2}/>
        <Fish image='./assets/tiny-small-pixel-fish-aquarium-animated-gif-picture-11.gif' size = {2}/>
        <Fish image='./assets/clownfishb.gif' size = {2}/>
        <Fish image='./assets/shark-swimming.gif' size = {4}/>
      </div>
    )}
        
      </WaterWave>
      </div>
    );
  }
}

export default Aquarium;