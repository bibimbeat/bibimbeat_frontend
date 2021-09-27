import './App.css';
import MenuBar from './components/menuBar/menuBar';
import Banner from './components/banner/banner';
import Player from './components/player/player';
// import { useState } from 'react';

function App() {
  return (
  <div>


  <div className="backGround">
  <div className="menuBar">
  <MenuBar />
  </div>
  <div className="banner">
  <Banner />
  </div>
  <div className="player">
  <Player />
  </div>
  </div>


  </div>
  );
}

// import { useState } from 'react';
// const [Text, setText] = useState("sex");

// const putText = () => {
//   setText("Hello World!");
// }

// return (
//   <div className="App">
//     <p>{Text}</p>
//     <div onClick={putText}>Click me honey</div>
//   </div>
// );



export default App;
