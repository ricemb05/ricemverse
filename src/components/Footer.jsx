import RCM from '../assets/RCM-black.svg'
import { useState, useRef, useEffect } from "react";


export default function Footer() {
    const boxRef = useRef(null);

    const [card, setCard] = useState();




    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const mouseY = e.clientY - rect.top;

        const isTopHalf = mouseY < rect.height / 2;

        if (isTopHalf) {

            setCard('enter-top')
        } else {

            setCard('enter-bottom')
        }
    };

    const handleMouseLeave = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const isTopHalf = mouseY < rect.height / 2;

        if (isTopHalf) {
            setCard('leave-top')
        } else {
            setCard('leave-bottom')
        }
    }




    return (
        <>
            {/* <div
                className={`card ${card}`}
                ref={boxRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ height: "150px" }}
            >
                Hover me
            </div> */}
            <div className="footer">

                


                <div className="footer-logo"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img className="logo" src={RCM} alt="RCM" />
                    <div className={`footer-carousel ${card}`}

                    >
                        <div className="footer-carousel-group">
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                        </div>
                        <div className="footer-carousel-group" aria-hidden>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                            <img src={RCM} alt="RCM" />
                            <h2>Built from vision</h2>
                        </div>
                    </div>
                </div>



                <div className="firstSection" style={{ height: "150px" }}>

                </div>
                <div className="contactSection">

                </div>
            </div>


        </>
    )
}