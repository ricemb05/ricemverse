import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero3js from "./Hero3js";


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





    return (
        <div className="hero" >
            <div className="firstSection" >
                <span>Turn your</span>
                <span ref={textRef}></span>
                <span >into Reality</span>
            </div>

            <div className='hero3js'>
                <Hero3js />
            </div>

          



        </div>

        




    )
}