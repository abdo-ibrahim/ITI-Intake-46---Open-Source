import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function ProjectsSection() {
  return (
    <MotionSection id="projects">
      <Container>
        <SectionHeading eyebrow="Portfolio" title="Projects" subtitle="A selection of products and systems I contributed to" />

        <div className="grid gap-5 lg:grid-cols-3">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.title} title={project.title} description={project.description} technologies={project.technologies} githubUrl={project.githubUrl} liveDemoUrl={project.liveDemoUrl} />
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export default ProjectsSection;
