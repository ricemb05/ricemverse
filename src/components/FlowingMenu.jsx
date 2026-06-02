import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Arrow from "../assets/LongArrowWhite.svg";
import "./FlowingMenu.css";

function FlowingMenu({
  items,
  speed,
  textColor,
  bgColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isOpen,
}) {

  return (
    <div
      className={`menu-wrap ${isOpen ? "" : "hidden"}`}
      style={{ backgroundColor: bgColor }}
    >
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            index={idx}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  text,
  index,
  description,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isOpen,
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);

  const [repetitions, setRepetitions] = useState(6);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  // ---------------------------------------------------
  // REPEATS (safe visual filler only)
  // ---------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    setRepetitions(6); // fixed stable value (NO bugs, NO overflow)
  }, [isOpen]);

  // ---------------------------------------------------
  // GSAP MARQUEE (FIXED BIDIRECTIONAL)
  // ---------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    if (!marqueeInnerRef.current) return;

    const setupMarquee = () => {
      const marqueeContent =
        marqueeInnerRef.current.querySelector(".marquee__part");

      if (!marqueeContent) return;

      const contentWidth = marqueeContent.getBoundingClientRect().width;
      if (!contentWidth) return;

      animationRef.current?.kill();

      const direction = index % 2 === 0 ? -1 : 1;

      // 🔥 KEY FIX: correct start position
      const startX = direction === -1 ? 0 : -contentWidth;
      const endX = direction === -1 ? -contentWidth : 0;

      gsap.set(marqueeInnerRef.current, {
        x: startX,
      });

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: endX,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    const timer = setTimeout(setupMarquee, 100);

    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [isOpen, speed, index, text, image]);

  // ---------------------------------------------------
  // HOVER ANIMATIONS (UNCHANGED)
  // ---------------------------------------------------
  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const topEdgeDist = (x - rect.width / 2) ** 2 + (y - 0) ** 2;
    const bottomEdgeDist = (x - rect.width / 2) ** 2 + (y - rect.height) ** 2;

    const edge = topEdgeDist < bottomEdgeDist ? "top" : "bottom";

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      })
      .set(marqueeInnerRef.current, {
        y: edge === "top" ? "101%" : "-101%",
      })
      .to([marqueeRef.current, marqueeInnerRef.current], {
        y: "0%",
      });
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const topEdgeDist = (x - rect.width / 2) ** 2 + (y - 0) ** 2;
    const bottomEdgeDist = (x - rect.width / 2) ** 2 + (y - rect.height) ** 2;

    const edge = topEdgeDist < bottomEdgeDist ? "top" : "bottom";

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      })
      .to(marqueeInnerRef.current, {
        y: edge === "top" ? "101%" : "-101%",
      });
  };


  const textRef = useRef(null);
  const boxref = useRef(null);

  useEffect(() => {
    if (!boxref.current || !textRef.current) return;

    // kill previous animations
    gsap.killTweensOf([boxref.current, textRef.current]);

    // reset states first
    gsap.set(boxref.current, {
      scaleX: 0,
      transformOrigin: "center",
    });

    gsap.set(textRef.current, {
      yPercent: 120,
    });

    // if closed → stop here
    if (!isOpen) return;

    const tl = gsap.timeline();

    // 1. container opens from center
    tl.to(boxref.current, {
      scaleX: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: .8 + index * 0.15,
    });

    // 2. text slides in
    tl.to(
      textRef.current,
      {
        yPercent: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, [isOpen, index]);


  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  return (
    <div
      className="menu__item"
      ref={boxref}
      style={{
        borderColor,
        transformOrigin: "center",
      }}
    >
      <a
        ref={textRef}
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor, display: "inline-block" }}
      >
        {text}
      </a>

      <div
        className="marquee"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="marquee__inner-wrap">
          <div
            className="marquee__inner"
            ref={marqueeInnerRef}
            aria-hidden="true"
          >
            {[...Array(repetitions)].map((_, idx) => (
              <div
                className="marquee__part"
                key={idx}
                style={{ color: marqueeTextColor }}
              >
                <span>{description}</span>
                <div className="ArrowCircle">
                  <img src={Arrow} alt={description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;