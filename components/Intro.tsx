import ScrubText from "./ScrubText";
import Pill from "./Pill";

export default function Intro() {
  return (
    <section className="intro container" aria-labelledby="intro-title">
      <div className="intro__inner">
        <p className="eyebrow" data-reveal="">See What&apos;s New</p>
        <h2 className="intro__title" id="intro-title" data-reveal="">Timeless Craft</h2>
        <ScrubText
          className="intro__text"
          parts={[
            <span className="spark" aria-hidden="true" key="s">✳</span>,
            " Discover iconic ",
            <Pill src="/assets/pill-1.webp" key="p1" />,
            " watches that blend precision engineering with bold, ",
            <Pill src="/assets/pill-2.webp" key="p2" />,
            " contemporary design.",
          ]}
        />
      </div>
    </section>
  );
}
