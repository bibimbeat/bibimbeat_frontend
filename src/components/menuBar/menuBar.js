import ConnectWallet from './connectWallet';
import BibimbeatLogo from './logo';
import MainMenu from './mainMenu';
import MyMusic from './myMusic';
import DotMenu from './dotMenu';
import './menuBar.css';

function MenuBar() {
    return (
    <div>
        <div className="flex-container">
        <div className="logo"><BibimbeatLogo /></div>
        <div className="mainMenu"><MainMenu /></div>
        <div className="myMusic"><MyMusic /></div>
        <div className="connectWallet"><ConnectWallet /></div>
        <div classNAme="dotMenu"><DotMenu /></div>        
        </div>

    </div>
    );
  }


  export default MenuBar;