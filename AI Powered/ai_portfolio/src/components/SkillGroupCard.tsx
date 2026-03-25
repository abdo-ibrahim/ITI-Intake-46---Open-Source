import { motion } from "framer-motion";

type SkillGroupCardProps = {
  category: string;
  skills: string[];
};

function SkillGroupCard({ category, skills }: SkillGroupCardProps) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="rounded-2xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
      <h3 className="font-[Space_Grotesk] text-xl font-semibold text-slate-900 dark:text-slate-100">{category}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-800/80 dark:bg-cyan-950/50 dark:text-cyan-300">
            {skill}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default SkillGroupCard;
