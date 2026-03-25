import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type MotionSectionProps = PropsWithChildren<{
  id: string;
  className?: string;
}>;

function MotionSection({ id, className = "", children }: MotionSectionProps) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>
      {children}
    </motion.section>
  );
}

export default MotionSection;
