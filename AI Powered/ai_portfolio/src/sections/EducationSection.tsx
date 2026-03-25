import { HiAcademicCap } from "react-icons/hi2";
import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function EducationSection() {
  return (
    <MotionSection id="education">
      <Container>
        <SectionHeading eyebrow="Learning" title="Education" subtitle="Continuous growth through academic foundations and practical tracks" />

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioData.education.map((item) => (
            <article key={item.institution} className="rounded-2xl border border-slate-200/70 bg-white/65 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
              <p className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <HiAcademicCap size={14} />
                {item.period}
              </p>
              <h3 className="mt-4 font-[Space_Grotesk] text-xl font-semibold text-slate-900 dark:text-slate-100">{item.institution}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export default EducationSection;
