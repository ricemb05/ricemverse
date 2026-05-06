import RCM from '../assets/RCM-black.svg'
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