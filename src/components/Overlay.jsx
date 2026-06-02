import { useEffect, useRef } from "react";
import gsap from "gsap";
import Waves from "./Waves";

export default function Overlay({ id, trigger, setTrigger }) {
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
    return gsap.to(overlayRef.current, {
      clipPath: "inset(50% 0% 50% 0%)",
      pointerEvents: "none",
      duration: 1,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    if (!trigger || !id) return;

    const el = document.getElementById(id);
    if (!el) return;

    const extra = window.innerHeight;

    const target =
      el.getBoundingClientRect().top + (id == "Projects" ? window.scrollY + extra : window.scrollY);

    const tl = gsap.timeline();

    tl.add(openOverlay())
      .add(() => {
        window.scrollTo({
          top: target,
          behavior: "smooth",
        });
      })
      .to({}, { duration: 1.5 })
      .add(closeOverlay)
      .add(() => setTrigger(false)); // reset trigger
  }, [trigger, id]);

  return (
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
  );
}