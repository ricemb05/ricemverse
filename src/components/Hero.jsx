import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero3js from "./Hero3js";
import Waves from "./Waves"
import Projects from "./Projects";



gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);





export default function Hero() {



    const textRef = useRef(null);

    useEffect(() => {
        const texts = [
            "Vision",
            "Imagination",
            "Creativity"
        ];

        let index = 0;

        const el = textRef.current;

        function scrambleNext() {
            gsap.to(el, {
                duration: 2,
                scrambleText: {
                    text: texts[index],
                    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    speed: .5
                },
                ease: "none",
                onComplete: () => {
                    index = (index + 1) % texts.length;

                    gsap.delayedCall(1, scrambleNext);
                }
            });
        }


        scrambleNext();

        return () => {
            gsap.killTweensOf(el);
        };
    }, []);



    const overlayRef = useRef(null);
    const openOverlay = () => {
        return gsap.fromTo(
            overlayRef.current,
            {
                clipPath: "inset(50% 50% 50% 50%)",
                pointerEvents: "none",
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                pointerEvents: "all",
                duration: 2,
                ease: "power3.out",
            }
        );
    };
    const closeOverlay = () => {
        gsap.to(overlayRef.current, {
            clipPath: "inset(50% 0% 50% 0%)",
            pointerEvents: "none",
            duration: 1,
            ease: "power3.inOut",
        });
    };
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const extra = window.innerHeight;

        const target =
            el.getBoundingClientRect().top + window.scrollY + extra;

        const tl = gsap.timeline();

        tl.add(openOverlay()) // 👈 IMPORTANT: call + return tween
            .add(() => {
                window.scrollTo({
                    top: target,
                    behavior: "smooth",
                });
            })
            .to({}, { duration: 1.5 })
            .add(closeOverlay);
    };




    return (
        <section className="hero" >

            <div className="firstSection" >
                <div className="innerSection">
                    <span>Turn your</span>
                    <span ref={textRef}></span>
                    <span >into <span>REALITY</span></span>
                </div>
                {/* <div class="square"></div> */}
                <div className="heroCTA">
                    <p>An aspiring Web Developer passionate about building clean, responsive, and user-friendly websites. I continuously improve my skills while creating efficient, meaningful digital experiences that solve real problems and provide value to users.</p>
                    <div className="heroCTAlinks">
                        <a href="">Let`s Talk!</a>
                        <a onClick={() => scrollToSection("Projects")} >Work Archive</a>
                    </div>

                </div>
            </div>
            <Waves
                lineColor="#ffffff77"
                backgroundColor="rgba(255, 255, 255, 0.2)"
                waveSpeedX={0.0125}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
            />
            <div className='hero3js'>
                <Hero3js />
            </div>
            <div className="overlay" ref={overlayRef}>
                <Waves
                    lineColor="black"
                    backgroundColor="#ffffff"
                    waveSpeedX={0.0125}
                    waveSpeedY={0.01}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                />
            </div>

        </section>






    )
}