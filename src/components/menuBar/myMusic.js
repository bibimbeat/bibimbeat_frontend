import './menuBar.css';
import music from '../images/music.png';
import './myMusic.css';


function MyMusic() {
    return (
        <div>
        <div className="myMusic">
            <div><span>My</span><img src={music}></img></div>
        </div>
        </div>
    );
}

export default MyMusic;