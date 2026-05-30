import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import data from "../assets/data/projects.json"




gsap.registerPlugin(ScrollTrigger);


export default function Projects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const background = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".panel");
            const track = trackRef.current;

            const distance = (panels.length - 1) * window.innerWidth;
            background.current.style.height = `${distance + window.innerHeight}px`;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => "+=" + distance,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,

                    // markers: true,
                }
            });

            // Phase 1: entrance (small portion of scroll)
            tl.fromTo(
                track,
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1,
                    ease: "power3.out"
                }
            )

                // Phase 2: horizontal scroll (main part)
                .to(
                    track,
                    {
                        x: -distance,
                        ease: "none",
                        duration: 0.85
                    }
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>

            <section className="Projects" id="Projects">

                <div className="background-border white" ref={background}>
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

                <section className="horizontal-section" ref={sectionRef}>
                    <div className="horizontal-track" ref={trackRef}>
                        {data.projects.map((project) => (
                            <div className="panel" key={project.id}>
                                <div className="project-container">
                                    <div className="first-section">
                                        <h2>{project.title}</h2>
                                    </div>
                                    <div className="second-section">
                                        <div className="project-preview">
                                            <div className="image-pannel first">
                                                <img className="image-1" src={project.images.image[0]} alt={project.images.alts[0]} />
                                            </div>
                                            <div className="image-pannel second">
                                                <img className="image-2" src={project.images.image[1]} alt={project.images.alts[1]} />
                                                <img className="image-3" src={project.images.image[2]} alt={project.images.alts[2]} />
                                            </div>
                                        </div>
                                        <div className="project-details">
                                            <div className="project-description">
                                                <p>
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="project-technologies">
                                                <div className="technologies">
                                                    {project.techStack.map((tech, i) => (
                                                        <span key={i} className="tech-badge">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                    View now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        {/* <div className="panel">
                            <div className="project-container">
                                <div className="first-section">
                                    <h2>Project Title</h2>
                                </div>
                                <div className="second-section">
                                    <div className="project-preview">

                                    </div>
                                    <div className="project-details">
                                        <div className="project-description">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                        </div>
                                        <div className="project-technologies">
                                            <div className="technologies">
                                                <span>HTML</span>
                                                <span>CSS</span>
                                                <span>JAVSCRIPT</span>
                                                <span>PHP</span>
                                            </div>
                                            <button>View now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>

            </section>


        </>
    )
}