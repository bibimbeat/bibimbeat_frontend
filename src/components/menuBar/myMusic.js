import './menuBar.css';
import music from '../images/music.png';
import './myMusic.css';
import { Route, Link } from 'react-router-dom';

function MyMusic() {
    return (
        <div>
        <div className="myMusic">
            <Link to="myMusicList" style={{ textDecoration: 'none'}}><div style={{ textDecoration: 'none', backgroundColor: 'red', height:'0px' }}><span id="my" >My</span><img id="img" src={music}></img></div></Link>
        </div>
        </div>
    );
}

export default MyMusic;