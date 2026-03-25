import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import SkillGroupCard from "../components/SkillGroupCard";
import { portfolioData } from "../data/portfolioData";

function SkillsSection() {
  return (
    <MotionSection id="skills">
      <Container>
        <SectionHeading eyebrow="Stack" title="Skills" subtitle="Technologies I use to design, build, and scale software" />

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioData.skills.map((group) => (
            <SkillGroupCard key={group.category} category={group.category} skills={group.skills} />
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export default SkillsSection;
