import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
};

function ProjectCard({ title, description, technologies, githubUrl, liveDemoUrl }: ProjectCardProps) {
  return (
    <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="group rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/65">
      <h3 className="font-[Space_Grotesk] text-2xl font-semibold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-300">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li key={`${title}-${tech}`} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-3">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-600 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-300">
          <FaGithub size={15} />
          GitHub
        </a>
        <a
          href={liveDemoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
          <FaExternalLinkAlt size={13} />
          Live Demo
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
