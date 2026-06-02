import RCM from '../assets/RCM-white.svg'
import RCM_black from '../assets/RCM-black.svg'

import RICEMBTNS from '../assets/RICEMBTNS-white.svg'
import { useState, useRef, useEffect } from "react";

import Overlay from './Overlay';


export default function Footer() {
    const boxRef = useRef(null);

    const [entry, setEntry] = useState();
    const [reverse, setReverse] = useState(false);




    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const mouseY = e.clientY - rect.top;

        const isTopHalf = mouseY < rect.height / 2;
        setReverse(!isTopHalf)

        if (isTopHalf) {
            setEntry('enter-top')
        } else {
            setEntry('enter-bottom')

        }
    };

    const handleMouseLeave = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const isTopHalf = mouseY < rect.height / 2;

        if (isTopHalf) {
            setEntry('leave-top')
        } else {
            setEntry('leave-bottom')
        }
    }


    const [id, setId] = useState();
    const [triggerScroll, setTriggerScroll] = useState(false);

    const handleClick = (targetId) => {
        setId(targetId);
        setTriggerScroll(true);
    };


    return (
        <>

            <footer className="footer">

                <div className="footer-logo"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img className="logo" src={RCM} alt="RCM" />
                    <div className={`footer-carousel ${entry} ${reverse}`}

                    >
                        <div className="footer-carousel-group"
                        >
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                        </div>
                        <div className="footer-carousel-group" aria-hidden>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM_black} alt="RCM" />
                            <h2>Built from vision</h2>
                        </div>
                    </div>
                </div>

                <div className="footer-content">
                    <div className="footer-contact">
                        <a href="mailto:ricembotones05@gmail.com">ricembotones05@gmail.com</a>
                        <a href="https://www.linkedin.com/in/ricem-mernen-p-botones-a578482b8" target="_blank"
                            rel="noopener noreferrer">linkedin</a>
                        <a href="https://github.com/ricemb05/" target="_blank"
                            rel="noopener noreferrer">github</a>
                    </div>
                    <div className="footer-nav">
                        <a onClick={() => handleClick("About")} >Overview</a>
                        <a onClick={() => handleClick("Projects")} >Projects</a>
                        <span>Contacts</span>
                    </div>

                    <div className="footer-credits">
                        <span>©2026 All Rights Reserved</span>
                    </div>

                    <br />
                </div>

                <div className="name-svg" >
                    <img src={RICEMBTNS} alt="All rights reserverd" />
                </div>

                <Overlay id={id} trigger={triggerScroll} setTrigger={setTriggerScroll} />


            </footer>


        </>
    )
}