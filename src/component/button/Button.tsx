'use client';
import { SubmitButtonProps } from '@/type/Type';
import { motion } from 'framer-motion';

const SubmitButton:React.FC<SubmitButtonProps> =({ text, delay }) =>{
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      className="w-full bg-indigo-600 text-[#f6f6f6] py-3 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300 hover:bg-indigo-700 mb-4 cursor-pointer"
    >
      {text}
    </motion.button>
  );
}

export default SubmitButton