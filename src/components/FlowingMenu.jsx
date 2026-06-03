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
  onToggleMenu,
  isOpen
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
            onToggleMenu={onToggleMenu}
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
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  onToggleMenu,
  isOpen
}) {
  const boxRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const textRef = useRef(null);
  const animationRef = useRef(null);

  const [repetitions, setRepetitions] = useState(6);

  const animationDefaults = { duration: 0.6, ease: "expo.out" };

  // ---------------------------------------------------
  // OPEN / CLOSE EXIT ANIMATION (FIXED)
  // ---------------------------------------------------
  useEffect(() => {
    if (!boxRef.current || !textRef.current) return;

    gsap.killTweensOf([boxRef.current, textRef.current]);

    if (!isOpen) {
      // EXIT animation
      gsap.to(boxRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.in",
        delay: index * 0.05,
      });

      gsap.to(textRef.current, {
        yPercent: 120,
        duration: 0.6,
        ease: "power3.in",
        delay: index * 0.05,
      });

      return;
    }

    // OPEN animation
    gsap.set(boxRef.current, {
      scaleX: 0,
      transformOrigin: "center",
    });

    gsap.set(textRef.current, {
      yPercent: 120,
    });

    const tl = gsap.timeline();

    tl.to(boxRef.current, {
      scaleX: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.8 + index * 0.15,
    }).to(
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
  // MARQUEE LOOP
  // ---------------------------------------------------
  useEffect(() => {
    if (!isOpen || !marqueeInnerRef.current) return;

    const el = marqueeInnerRef.current;

    const setup = () => {
      const width = el.scrollWidth / 2;
      if (!width) return;

      animationRef.current?.kill();

      const dir = index % 2 === 0 ? -1 : 1;

      const startX = dir === -1 ? 0 : -width;
      const endX = dir === -1 ? -width : 0;

      gsap.set(el, { x: startX });

      animationRef.current = gsap.to(el, {
        x: endX,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    const t = setTimeout(() => requestAnimationFrame(setup), 100);

    return () => {
      clearTimeout(t);
      animationRef.current?.kill();
    };
  }, [isOpen, speed, index]);



  const handleClick = (e) => {
    e.preventDefault();

    const target = document.getElementById(link);
    if (!target) return;


    setTimeout(() => {
      const extra = window.innerHeight;

      const top =
        target.getBoundingClientRect().top +
        window.scrollY +
        (link === "Projects" ? extra : 0);

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    },); // match GSAP close duration
    setTimeout(() => {
      onToggleMenu(false); // close menu first
    }, 800)

  };

  // ---------------------------------------------------
  // HOVER ENTER
  // ---------------------------------------------------
  const handleMouseEnter = (ev) => {
    if (!boxRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = boxRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const topDist = (x - rect.width / 2) ** 2 + (y - 0) ** 2;
    const bottomDist = (x - rect.width / 2) ** 2 + (y - rect.height) ** 2;

    const edge = topDist < bottomDist ? "top" : "bottom";

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

  // ---------------------------------------------------
  // HOVER LEAVE
  // ---------------------------------------------------
  const handleMouseLeave = (ev) => {
    if (!boxRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = boxRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    const topDist = (x - rect.width / 2) ** 2 + (y - 0) ** 2;
    const bottomDist = (x - rect.width / 2) ** 2 + (y - rect.height) ** 2;

    const edge = topDist < bottomDist ? "top" : "bottom";

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      })
      .to(marqueeInnerRef.current, {
        y: edge === "top" ? "101%" : "-101%",
      });
  };

  return (
    <div
      className="menu__item"
      ref={boxRef}
      style={{
        borderColor,
        transformOrigin: "center",
      }}
    >
      <a
        ref={textRef}
        className="menu__item-link"
        href="#"
        onClick={handleClick}
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
          <div className="marquee__inner" ref={marqueeInnerRef}>
            {[...Array(repetitions)].map((_, idx) => (
              <div
                key={idx}
                className="marquee__part"
                style={{ color: marqueeTextColor }}
              >
                <span>{description}</span>
                <div className="ArrowCircle">
                  <img src={Arrow} alt="" />
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