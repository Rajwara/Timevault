import Image from "next/image";
import { BagIcon } from "./Icons";
import ScrubText from "@/components/ScrubText";
import s from "@/app/collection/collection.module.css";

export default function About() {
  return (
    <section className={s.about} id="about" aria-labelledby="about-title">
      <div className={s.aboutTop}>
        <div>
          <p className={s.label} data-reveal="">*Our story</p>
          <h2 id="about-title" className={s.h2Left} data-reveal="">About Us</h2>
          <span className={s.progress} aria-hidden="true"><i /></span>
        </div>
        <ScrubText
          className={s.aboutLead}
          parts={[
            <span className="spark" aria-hidden="true" key="s">✳</span>,
            " Feel the sweep of the second hand. Hear the quiet click of the crown. Every watch we make is designed to keep perfect time, survive the adventure and still look sharp at dinner.",
          ]}
        />
      </div>

      <div className={s.aboutRow}>
        <div className={s.aboutImg} data-reveal="">
          <Image src="/assets/story-1.webp" alt="A watch worn with a dark jacket" width={1200} height={1000} sizes="(max-width: 760px) 100vw, 600px" />
        </div>
        <div className={s.aboutText} data-reveal="" style={{ "--d": ".15s" } as React.CSSProperties}>
          <h3>Sapphire crystal, surgical-grade steel and straps cut from full-grain leather.</h3>
          <p>
            Each movement is regulated in five positions and tested for 21 days before it leaves our
            studio. The result is a watch that stays within seconds a day — for decades.
          </p>
          <ul className={s.stats}>
            <li><strong>25+</strong><span>Years of craft</span></li>
            <li><strong>5 yr</strong><span>Warranty</span></li>
            <li><strong>200m</strong><span>Water resistant</span></li>
          </ul>
          <a href="#collections" className={s.btnDark}>Shop Now <BagIcon /></a>
        </div>
      </div>
    </section>
  );
}
