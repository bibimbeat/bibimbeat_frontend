// import './menuBar.css';
import stylesDotMenu from './dotMenu.module.css';



function DotMenu() {


    return (
        <div>
            <a href="#" className={stylesDotMenu.dots}>
            <div className={stylesDotMenu.dot}></div>
            </a>
        </div>
    );
}



export default DotMenu;