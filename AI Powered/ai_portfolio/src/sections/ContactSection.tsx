import { useState, type FormEvent } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();

    window.setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <MotionSection id="contact" className="pb-20 sm:pb-24">
      <Container>
        <SectionHeading eyebrow="Connect" title="Contact" subtitle="Have an idea or opportunity? Let us build something impactful together." />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-2xl border border-slate-200/70 bg-white/65 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
            <h3 className="font-[Space_Grotesk] text-xl font-semibold text-slate-900 dark:text-slate-100">Reach Me Directly</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${portfolioData.contact.email}`} className="inline-flex items-center gap-3 text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                  <FaEnvelope />
                  {portfolioData.contact.email}
                </a>
              </li>
              <li>
                <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                  <FaGithub />
                  GitHub
                </a>
              </li>
              <li>
                <a href={portfolioData.contact.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
                  <FaLinkedin />
                  LinkedIn
                </a>
              </li>
            </ul>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/70 bg-white/65 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Name
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-300"
                />
              </label>

              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-300"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Message
              <textarea
                required
                rows={5}
                name="message"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-300"
              />
            </label>

            <button type="submit" className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
              Send Message
            </button>

            {sent ? <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">Message captured successfully. Integrate an email service to deliver it.</p> : null}
          </form>
        </div>
      </Container>
    </MotionSection>
  );
}

export default ContactSection;
