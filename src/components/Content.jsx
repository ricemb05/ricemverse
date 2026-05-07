import diamond from "../assets/green-diamond.svg";
import plus from "../assets/plus-icon-white.svg";

import SVGComponent from './SVGComponent.jsx'

import { useEffect, useRef, useLayoutEffect } from "react";
import VanillaTilt from "vanilla-tilt";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {

    const tiltRef = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tiltRef.current, {
            max: 20,
            speed: 200,
            scale: 1.05,
        });
    }, []);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const containers = sectionRef.current.querySelectorAll(".container");

        containers.forEach((el, i) => {
            const scaleValue = 0.9 + i * 0.05; // 0.8 → 0.85 → 0.9 → 0.95
            const yValue = 100 - i * 60;        // 100 → 95 → 90 → 85

            gsap.fromTo(
                el,
                {
                    scale: 1,
                    filter: "blur(0px)",
                },
                {
                    scale: scaleValue - 0.05,
                    y: yValue + 100,
                    filter: "blur(3px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 15%",
                        end: "bottom 3%",
                        scrub: true,
                        // markers: true,
                    },
                }
            );
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);


    const project_sect = useRef(null);

    const Projects = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".Projects-title",
                {
                    y: 500,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: Projects.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: true,
                    },
                }
            );
        }, Projects);

        return () => ctx.revert();
    }, []);


    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: project_sect.current,
                    start: "top 20%",
                    end: "bottom -10%",
                    scrub: true,
                    markers: true,
                    pin: true,
                },
            });

            tl.fromTo(
                ".title",
                {
                    scale: 1,
                    transformOrigin: "85% center"
                },
                {
                    scale: 3.5,
                    duration: 3,
                }
            )

            .to(".title", {
                scale: 15,
                x: 2000,
                duration: 2,
            })

            .to(".title", {
                scale: 40,
                x: 5000,
                duration: 1,
            });

            

    }, project_sect);

    return () => ctx.revert();
}, []);




function CircularText() {
    return (
        <svg width="250" height="250" viewBox="0 0 200 200">

            <defs>
                <path
                    id="circle"
                    d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
                />
            </defs>

            {/* rotating text */}
            <g className="rotate">
                <text fontSize="13" fill="white" >
                    <textPath href="#circle">
                        • Rcm Bts • RCM BTS • Rcm Bts • RCM BTS • Rcm Bts • RCM BTS • Rcm Bts • RCM BTS
                    </textPath>
                </text>
            </g>

            {/* CENTERED LOGO GROUP */}
            <g className="planet-logo">
                {/* move origin to center FIRST */}
                <g transform="translate(100 100)">
                    <g transform="translate(-60 -60)">
                        <SVGComponent />
                    </g>
                </g>
            </g>

        </svg>
    );
}
return (
    <>


        <div className="About" >
            <div className="background-border">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>

            <div className="About-content" ref={sectionRef}>

                <div className="About-header">
                    <div className="about-header-container">
                        <span>About</span>
                        <h2>A little about me</h2>
                    </div>

                    <div className="circle-wrapper" ref={tiltRef}>
                        <div className="circle" ref={tiltRef} style={{ width: 250, height: 250 }}>
                            <CircularText />
                        </div>
                    </div>
                </div>

                <div className="container white">
                    <div className="about-text">
                        <span>Profile</span>

                        <div className="about-text-p">
                            <p>An aspiring Web Developer passionate about building clean, responsive, and user-friendly websites. I continuously improve my skills while creating efficient, meaningful digital experiences that solve real problems and provide value to users.</p>
                        </div>

                    </div>
                    <div className="container-number">
                        <span>01</span>
                    </div>
                </div>


                <div className="container green">
                    <div className="about-text">
                        <span>Planning the Structure</span>
                        <div className="about-text-p">
                            <p>Before writing any code, I break the idea into smaller, manageable parts and plan a clear structure using a component-based mindset, ensuring that each section has a clear purpose and fits well into the overall system.</p>                            </div>
                    </div>
                    <div className="container-number">
                        <span>02</span>
                    </div>
                </div>

                <div className="container white">
                    <div className="about-text">
                        <span>Designing the Experience</span>
                        <div className="about-text-p">
                            <p>I think about how the project should feel, focusing on user experience from the beginning so the design remains smooth, intuitive, and visually consistent across all devices.</p>                            </div>
                    </div>
                    <div className="container-number">
                        <span>03</span>
                    </div>
                </div>

                <div className="container green">
                    <div className="about-text">
                        <span>Building the Core</span>
                        <div className="about-text-p">
                            <p>I prioritize building the core functionality first before adding styles or visual enhancements to ensure everything works properly, logically, and is easy to maintain as the project grows.</p>
                        </div>
                    </div>
                    <div className="container-number">
                        <span>04</span>
                    </div>
                </div>

                <div className="container white">
                    <div className="about-text">
                        <span>Refining and Optimizing</span>
                        <div className="about-text-p">
                            <p>I finish by polishing the project, fixing inconsistencies, improving responsiveness, and optimizing performance for a production-ready result, while also reviewing the code to make sure it stays clean and scalable.</p>                            </div>
                    </div>
                    <div className="container-number">
                        <span>05</span>
                    </div>
                </div>
            </div>


            <div className="Projects-container" ref={Projects}>
                <div className="Projects-title" ref={project_sect}>
                    <div className="title">
                        <h1 >Projects </h1>
                        <img src={plus} alt="Projects" />
                    </div>
                </div>
            </div>



        </div>



    </>
)
}