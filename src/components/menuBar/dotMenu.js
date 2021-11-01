// import './menuBar.css';
import { useState, useRef, useEffect } from 'react';
import stylesDotMenu from './dotMenu.module.css';
import github from '../images/github.png';
import discord from '../images/discord.png';
import twitter from '../images/twitter.png';
import docs from '../images/docs.png';


function DotMenu() {

  // const menu = useRef(null);
  // useOutsideAlerter(menu);

  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
    
  //     // Function for click event
  //     function handleOutsideClick(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         // alert("you just clicked outside of menu!");
  //         showMenu();
  //       }
  //     }
    
  //     // Adding click event listener
  //     document.addEventListener("click", handleOutsideClick);
    
  //   }, [ref]);
  // }

    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

const [menuToggle, showMenu] = useState(null);
const clickMenuButton = () => {
  if(menuToggle == null) {
    showMenu(stylesDotMenu.show);
  } else {
    showMenu(null);
  }

}


    return (
        <div className={`${stylesDotMenu.dropdown} ${stylesDotMenu.dropbtn}` }  
        // ref={menu}
        >
            <div href="#" className={stylesDotMenu.dots}>
            <div  onClick={clickMenuButton} className={stylesDotMenu.dot}></div>
            </div>
            <div id={menuToggle} className={stylesDotMenu.dropdownContent}>
                <div className={stylesDotMenu.discord}><a href="https://discord.gg/VHCbKTN7" target="_blank"><img src={discord}></img></a></div>
                <div className={stylesDotMenu.twitter}><a href="https://twitter.com/bibimbeat" target="_blank"><img  src={twitter}></img></a></div>
                <div className={stylesDotMenu.github}><a href="https://github.com/bibimbeat" target="_blank"><img src={github}></img></a></div>
                <div className={stylesDotMenu.docs}><a href="https://bibimbeat.gitbook.io/bibimbeat/" target="_blank"><img src={docs}></img></a></div>
            </div>
        </div>
        // onclick="window.open('https://twitter.com/bibimbeat')"
    );
}



export default DotMenu;