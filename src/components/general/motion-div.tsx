'use client';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {}

const defailtVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const MotionCard: React.FC<Props> = (props) => {
  return (
    <motion.div
      variants={props.variants ?? defailtVariants}
      initial="hidden"
      animate="visible"
      {...props}
      transition={{ ease: 'easeInOut', duration: 0.3, ...(props.transition ?? {}) }}
    />
  );
};
