import React, {useState, useRef, useEffect} from 'react'
import styles from "../styles/AudioPlayer.module.css"
import {FaStepForward} from "react-icons/fa"
import {FaStepBackward} from "react-icons/fa"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {FaRandom} from "react-icons/fa"
import {ImLoop} from "react-icons/im"
import {MdPlaylistPlay} from "react-icons/md"

const AudioPlayer = () => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // references
    const audioPlayer = useRef();
    const progressBar = useRef(); //ref to progressBar
    const animationRef =useRef(); //ref the animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 6);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes} : ${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime(); 
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime(); 
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value - 30);
        changeRange();
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value + 30);
        changeRange();
    }

    return (
        <div className= {styles.audioPlayer}>
            <audio ref={audioPlayer} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload = "metadata"></audio>  
            <button className = {styles.forwardBackward} onClick={backThirty}><FaStepBackward /> </button>
            <button onClick= {togglePlayPause} className = {styles.playPause}>
                { isPlaying ? <FaPause /> : <FaPlay className= {styles.play}/>}
            </button>
            <button className = {styles.forwardBackward} onClick={forwardThirty}><FaStepForward /></button>
            <button className = {styles.forwardBackward}><FaRandom /></button>
            <button className = {styles.forwardBackward}><ImLoop /></button>
            <button className = {styles.forwardBackward}><MdPlaylistPlay /></button>

            {/* current time */}

            <div className = {styles.currentTime}>{calculateTime(currentTime)}</div>

            {/*  progress bar */}

            <div>
                <input type ="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange}/>
            </div>

            {/* duration */}
            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
    )
}

export { AudioPlayer }
