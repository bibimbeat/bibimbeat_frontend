import ConnectWallet from './connectWallet';
import BibimbeatLogo from './logo';
import MainMenu from './mainMenu';
import MyMusic from './myMusic';
import DotMenu from './dotMenu';
import './menuBar.css';

function MenuBar() {
    return (
    <nav>
        <div className="flex-container">
            <div className="logo"><BibimbeatLogo /></div>
            <div className="mainMenu"><MainMenu /></div>
            {/* <div className="myMusic"></div> */}
            <div className="connectWallet"><MyMusic /><ConnectWallet /><DotMenu /></div>
            <div classNAme="dotMenu"></div>        
        </div>

    </nav>
    );
  }


  export default MenuBar;