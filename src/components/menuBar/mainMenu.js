import './menuBar.css';
import './mainMenu.css';

import { Route, Link } from 'react-router-dom';

function MainMenu() {
    return (
        <div>
            <div className="mainMenu">
{/* 
            <div><span>Home</span></div>
            <div><span>Mint NFT</span></div>
            <div><span>Market</span></div> */}

            <Link className="link" style={{ textDecoration: 'none' }}to="/"><span>Home</span></Link>
            <Link className="link" style={{ textDecoration: 'none' }}to="/mintNFT"><span>Mint NFT</span></Link>
            <Link className="link" style={{ textDecoration: 'none' }}to="/market"><span>Market</span></Link>

            </div>
        </div>
    );
}

export default MainMenu;