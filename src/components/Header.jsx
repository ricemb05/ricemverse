import { useState, useEffect } from "react"
import RCM from '../assets/RCM-white.svg'


export default function Header() {



    const [hide, setHide] = useState(false);

    useEffect(() => {
        let lastScroll = window.scrollY;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 50) {
                setHide(true); // scrolling down
            } else {
                setHide(false); // scrolling up
            }

            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className={`header ${hide ? "hide" : ""}`}>
            <div className="logo">
                <img src={RCM} alt="RCM" />
            </div>
            <div className="navigation">
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Projects</a>
                    <button>Let`s talk! </button>
                </nav>
            </div>
        </div>
    )
}