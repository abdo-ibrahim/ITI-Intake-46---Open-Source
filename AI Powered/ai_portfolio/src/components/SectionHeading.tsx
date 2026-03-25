type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="mb-10 text-center sm:mb-14">
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-500 dark:text-cyan-300">{eyebrow}</p> : null}
      <h2 className="font-[Space_Grotesk] text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-slate-100">{title}</h2>
      {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
    </header>
  );
}

export default SectionHeading;
