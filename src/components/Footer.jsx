import RCM from '../assets/RCM-white.svg'
import RCM_black from '../assets/RCM-black.svg'

import RICEMBTNS from '../assets/RICEMBTNS-white.svg'
import { useState, useRef, useEffect } from "react";


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




    return (
        <>

            <div className="footer">

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
                        <span>ricembotones05@gmail.com</span>
                        <span>linkedin</span>
                        <span>github</span>
                    </div>
                    <div className="footer-nav">
                        <a href="#About">Overview</a>
                        <a href="#Projects">Projects</a>
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

            </div>


        </>
    )
}