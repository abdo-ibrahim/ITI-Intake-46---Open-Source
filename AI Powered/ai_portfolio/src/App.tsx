import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ResumeSection from "./sections/ResumeSection";
import SkillsSection from "./sections/SkillsSection";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

function App() {
  const preferredDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      return true;
    }

    if (stored === "light") {
      return false;
    }

    return preferredDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const backgroundClasses = useMemo(
    () =>
      "relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_0%_0%,rgba(6,182,212,0.20),transparent_36%),radial-gradient(circle_at_100%_30%,rgba(16,185,129,0.16),transparent_36%),linear-gradient(to_bottom_right,#f8fafc,#eefdf9_35%,#f8fafc_75%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(6,182,212,0.26),transparent_36%),radial-gradient(circle_at_100%_30%,rgba(16,185,129,0.2),transparent_36%),linear-gradient(to_bottom_right,#020617,#06212c_35%,#030712_75%)]",
    [],
  );

  return (
    <div className={backgroundClasses}>
      <Navbar links={navLinks} isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
