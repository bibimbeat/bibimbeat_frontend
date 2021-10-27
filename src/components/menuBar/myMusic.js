// import './menuBar.css';
import music from '../images/music.png';
import stylesMyMusic from './myMusic.module.css';
import { Link } from 'react-router-dom';

function MyMusic() {
    return (
        <div>
            <Link to="myMusicList" style={{ textDecoration: 'none' }}>
                <div className={stylesMyMusic.myMusic}>
                    <div style={{ textDecoration: 'none', backgroundColor: 'red', height: '0px' }}>
                        <span id={stylesMyMusic.my}>My</span>
                        <img id={stylesMyMusic.img} src={music} alt={music}></img>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MyMusic;