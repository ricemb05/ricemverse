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
  handleScroll
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
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isOpen,
  handleScroll
}) {
  // ✅ SINGLE REF (replaces itemRef + boxref)
  const boxRef = useRef(null);

  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const textRef = useRef(null);

  const [repetitions, setRepetitions] = useState(6);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  // ---------------------------------------------------
  // REPEATS
  // ---------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    setRepetitions(6);
  }, [isOpen]);

  // ---------------------------------------------------
  // CONTAINER + TEXT ANIMATION
  // ---------------------------------------------------
  useEffect(() => {
    if (!boxRef.current || !textRef.current) return;

    gsap.killTweensOf([boxRef.current, textRef.current]);

    gsap.set(boxRef.current, {
      scaleX: 0,
      transformOrigin: "center",
    });

    gsap.set(textRef.current, {
      yPercent: 120,
    });

    if (!isOpen) return;

    const tl = gsap.timeline();

    tl.to(boxRef.current, {
      scaleX: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.8 + index * 0.15,
    });

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
  // MARQUEE LOOP (FIXED WIDTH)
  // ---------------------------------------------------
  useEffect(() => {
    if (!isOpen || !marqueeInnerRef.current) return;

    const setupMarquee = () => {
      const el = marqueeInnerRef.current;

      const totalWidth = el.scrollWidth / 2;
      if (!totalWidth) return;

      animationRef.current?.kill();

      const direction = index % 2 === 0 ? -1 : 1;

      const startX = direction === -1 ? 0 : -totalWidth;
      const endX = direction === -1 ? -totalWidth : 0;

      gsap.set(el, { x: startX });

      animationRef.current = gsap.to(el, {
        x: endX,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(setupMarquee);
    }, 100);

    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [isOpen, speed, index]);

  // ---------------------------------------------------
  // HOVER ENTER
  // ---------------------------------------------------
  const handleMouseEnter = (ev) => {
    if (!boxRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = boxRef.current.getBoundingClientRect();
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

  // ---------------------------------------------------
  // HOVER LEAVE
  // ---------------------------------------------------
  const handleMouseLeave = (ev) => {
    if (!boxRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = boxRef.current.getBoundingClientRect();
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

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
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
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          handleScroll?.(link); // 👈 uses parent system
        }}
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