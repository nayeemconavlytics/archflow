import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 80,        // exaggerated
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,  // slower
      ease: "easeOut",
    },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3, // slower stagger
    },
  },
};
