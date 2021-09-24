import './menuBar.css';
import music from '../images/music.png';

function MyMusic() {
    return (
        <div>
        <div>
            <span>My</span><img src={music}></img>
        </div>
        </div>
    );
}

export default MyMusic;