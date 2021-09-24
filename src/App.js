import './App.css';
import BibimbeatLogo from './components/menuBar/logo';
import MainMenu from './components/menuBar/mainMenu';
import MyMusic from './components/menuBar/myMusic';
import logo from './components/menuBar/logo';
import ConnectWallet from './components/menuBar/connectWallet';
import DotMenu from './components/menuBar/dotMenu';
import MenuBar from './components/menuBar/menuBar';
// import { useState } from 'react';

function App() {
  return (
  <div className="center">
  {/* <BibimbeatLogo />
  <MainMenu />
  <MyMusic />
  <ConnectWallet />
  <DotMenu /> */}
  <MenuBar />
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
