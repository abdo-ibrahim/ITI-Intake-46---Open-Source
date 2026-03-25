import { FaDownload } from "react-icons/fa";
import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function ResumeSection() {
  return (
    <MotionSection id="resume">
      <Container>
        <div className="rounded-3xl border border-cyan-200/70 bg-gradient-to-br from-cyan-100/70 via-white/70 to-emerald-100/40 p-8 text-center shadow-sm backdrop-blur dark:border-cyan-900/60 dark:from-cyan-950/60 dark:via-slate-900/80 dark:to-emerald-950/40 sm:p-10">
          <SectionHeading eyebrow="Resume" title="Download My CV" subtitle="Grab a full overview of my education, experience, and technical background" />
          <a
            href={portfolioData.contact.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
            <FaDownload size={14} />
            Download CV
          </a>
        </div>
      </Container>
    </MotionSection>
  );
}

export default ResumeSection;
