import { useState, useEffect, useRef } from "react"
import RCM from '../assets/RCM-white.svg'
import FlowingMenu from "./FlowingMenu";
import gsap from 'gsap'


export default function Header() {
    const [hide, setHide] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const ignoreScroll = useRef(false);

    // 🔒 scroll hide header
    useEffect(() => {
        let lastScroll = window.scrollY;

        const handleScroll = () => {
            if (ignoreScroll.current) return;

            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 50) {
                setHide(true);
            } else {
                setHide(false);
            }

            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🔒 toggle menu
    function openMenu() {
        if (menuOpen) {
            gsap.to(menuWrapRef.current, {
                y: "-100%",
                duration: 1.3,
                ease: "power3.in",
                onComplete: () => {
                    setMenuOpen(false);
                }
            });
        } else {
            setMenuOpen(true);

            // 👇 IMPORTANT: force correct start BEFORE animating
            gsap.set(menuWrapRef.current, {
                y: "100%"
            });

            gsap.to(menuWrapRef.current, {
                y: 0,
                duration: 1.3,
                ease: "power3.inOut"
            });
        }
    }

    // 🔒 lock scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            const scrollY = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";

            document.body.dataset.scrollY = scrollY;
        } else {
            const scrollY = parseInt(document.body.dataset.scrollY || "0");

            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY);
        }
    }, [menuOpen]);

    useEffect(() => {
        ignoreScroll.current = true;

        const timer = setTimeout(() => {
            ignoreScroll.current = false;
        }, 300); // small buffer to avoid scroll jump issues

        return () => clearTimeout(timer);
    }, [menuOpen]);

    // 🧠 SAFE ITEMS (prevents FlowingMenu crash)
    const demoItems = [
        { link: "#", text: "Overview", description: "A little About Me", image: "https://picsum.photos/600/400?random=1" },
        { link: "#Projects", text: "Projects", description: "Explore my Works", image: "https://picsum.photos/600/400?random=2" },
        { link: "#", text: "Contact", description: "Let`s Talk", image: "https://picsum.photos/600/400?random=3" }
    ];


    const menuWrapRef = useRef(null);

    useEffect(() => {
        if (!menuWrapRef.current) return;

        if (menuOpen) {
            gsap.to(menuWrapRef.current, {
                y: 0,
                duration: 1.3,
                ease: "power3.inOut"
            });
        }
    }, [menuOpen]);
    useEffect(() => {
        gsap.set(menuWrapRef.current, {
            y: "100%"
        });
    }, []);


    return (

        <header className={`header ${hide ? "hide" : ""}`}>
            <div className="logo">
                <img src={RCM} alt="RCM" />
            </div>
            <div className={`navigation ${menuOpen ? "open" : ""}`}>
                <button onClick={openMenu}><span>Menu</span>
                    <div className="menuIcon">
                        <div className="iconLines">
                            <div className="line1"></div>
                            <div className="line2"></div>
                        </div>
                    </div>
                </button>
                {/* <nav>
                    <a href="#">Home</a>
                    <a href="#">Projects</a>
                    <button>Let`s talk! </button>
                </nav> */}
                <div ref={menuWrapRef} className="menu-wrap">
                    <FlowingMenu items={demoItems}
                        speed={15}
                        textColor="rgb(26, 26, 26)"
                        bgColor="white"
                        marqueeBgColor="#729e84"
                        marqueeTextColor="white"
                        borderColor="rgb(26, 26, 26)"
                        isOpen={menuOpen}
                    />
                </div>
            </div>


        </header>

    )
}