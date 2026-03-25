import { HiBriefcase } from "react-icons/hi2";
import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function ExperienceSection() {
  return (
    <MotionSection id="experience">
      <Container>
        <SectionHeading eyebrow="Career" title="Experience" subtitle="Hands-on internships and practical product development" />

        <div className="space-y-4">
          {portfolioData.experience.map((item) => (
            <article key={item.role} className="rounded-2xl border border-slate-200/70 bg-white/65 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="inline-flex items-center gap-2 font-[Space_Grotesk] text-xl font-semibold text-slate-900 dark:text-slate-100">
                  <HiBriefcase size={18} className="text-cyan-600 dark:text-cyan-300" />
                  {item.role}
                </h3>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{item.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export default ExperienceSection;
