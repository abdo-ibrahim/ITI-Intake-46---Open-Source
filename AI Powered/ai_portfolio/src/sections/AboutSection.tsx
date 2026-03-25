import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function AboutSection() {
  const { about } = portfolioData;

  return (
    <MotionSection id="about">
      <Container>
        <SectionHeading eyebrow="About" title="About Me" subtitle={about.headline} />
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/70 bg-white/65 p-7 text-base leading-relaxed text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/65 dark:text-slate-200 sm:p-9">
          <p>I am a Full Stack Developer focused on building practical digital products with modern tooling and long-term maintainability.</p>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-cyan-500 dark:marker:text-cyan-300">
            {about.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </Container>
    </MotionSection>
  );
}

export default AboutSection;
