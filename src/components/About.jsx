import diamond from "../assets/green-diamond.svg";
import plus from "../assets/plus-icon-white.svg";

import SVGComponent from './SVGComponent.jsx'

import { useEffect, useRef, useLayoutEffect } from "react";
import VanillaTilt from "vanilla-tilt";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {

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
            const scaleValue = 0.9 + i * 0.03; // 0.8 → 0.85 → 0.9 → 0.95
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
                        start: i == containers.length - 1 ? "top 25%" : "top 15%",
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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: Projects.current,
                    start: "top 70%",
                    end: "bottom 100%",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });

            tl.fromTo(
                ".Projects-title",
                {
                    y: 300,
                },
                {
                    y: -300,
                    duration: 2,
                }
            )

                // 2. Main title animation
                .fromTo(
                    ".title",
                    {
                        scale: 1,
                        xPercent: 0,
                        transformOrigin: "85% center",
                    },
                    {
                        xPercent: 20,
                        scale: 3.5,
                        ease: "none",
                        duration: 3,
                    }
                )

                .to(".title", {
                    scale: 15,
                    xPercent: 150,
                    ease: "none",
                    duration: 3,
                })

                .to(".title", {
                    scale: 40,
                    xPercent: 400,
                    ease: "none",
                    duration: 3,
                });

        }, Projects);

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
                    <text fontSize="12.3" fill="white" >
                        <textPath href="#circle">
                            • RCMBTNS • RCMBTNS • RCMBTNS • RCMBTNS • RCMBTNS • RCMBTNS
                        </textPath>
                    </text>
                </g>

                <g className="planet-logo">
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


            <section className="About" id="About">
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
                            <span>Understanding the Idea</span>
                            <div className="about-text-p">
                                <p>
                                    The project begins with a clear understanding of its goal, purpose, and requirements. This stage focuses on defining direction, identifying core needs, and establishing a strong foundation before any planning or design work starts.
                                </p>
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
                                <p>
                                    The concept is broken down into smaller, manageable parts and organized using a component-based structure. Each section is assigned a clear purpose to ensure consistency and scalability across the system.
                                </p>
                            </div>
                        </div>
                        <div className="container-number">
                            <span>02</span>
                        </div>
                    </div>

                    <div className="container white">
                        <div className="about-text">
                            <span>Designing the Experience</span>
                            <div className="about-text-p">
                                <p>
                                    User experience is considered early in the process to ensure the interface remains intuitive, smooth, and visually consistent across all devices and screen sizes.
                                </p>
                            </div>
                        </div>
                        <div className="container-number">
                            <span>03</span>
                        </div>
                    </div>

                    <div className="container green">
                        <div className="about-text">
                            <span>Building the Core</span>
                            <div className="about-text-p">
                                <p>
                                    Core functionality is implemented first before visual styling is applied, ensuring that the system is logically sound, stable, and easy to maintain as it scales.
                                </p>
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
                                <p>
                                    The final stage focuses on refining the product through performance optimization, responsiveness improvements, and code review to ensure a clean and production-ready output.
                                </p>
                            </div>
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



            </section>



        </>
    )
}