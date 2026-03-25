import { motion } from "framer-motion";
import { FiMail, FiMapPin } from "react-icons/fi";
import Container from "../components/Container";
import MotionSection from "../components/MotionSection";
import profilePlaceholder from "../assets/formal_profile.png";
import { portfolioData } from "../data/portfolioData";

function HeroSection() {
  const { hero } = portfolioData;

  return (
    <MotionSection id="hero" className="pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex rounded-full border border-cyan-300/70 bg-cyan-100/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300">
              Open To Opportunities
            </motion.p>

            <h1 className="mt-5 font-[Space_Grotesk] text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">{hero.name}</h1>
            <p className="mt-4 text-lg font-semibold text-slate-700 sm:text-xl dark:text-slate-300">{hero.title}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">{hero.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/55">
                <FiMapPin />
                {hero.location}
              </span>
              <a
                href={`mailto:${hero.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/60 px-3 py-2 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-cyan-300 dark:hover:text-cyan-300">
                <FiMail />
                {hero.email}
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative mx-auto w-full max-w-[320px]">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/45 to-emerald-300/30 blur-2xl dark:from-cyan-500/35 dark:to-emerald-500/20" />
            <img
              src={profilePlaceholder}
              alt="Abdulrahman Ibrahim profile placeholder"
              className="aspect-square w-full rounded-[2rem] border border-slate-200/70 bg-white/70 object-cover p-5 shadow-xl backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/65"
            />
          </motion.div>
        </div>
      </Container>
    </MotionSection>
  );
}

export default HeroSection;
