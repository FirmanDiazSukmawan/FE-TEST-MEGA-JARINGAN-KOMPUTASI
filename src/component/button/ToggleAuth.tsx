'use client';
import { ToggleAuthProps } from '@/type/Type';
import { motion } from 'framer-motion';

const ToggleAuth: React.FC<ToggleAuthProps> = ({ isLogin, toggleForm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center"
    >
      <p className="text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button 
          onClick={toggleForm}
          className="ml-2 text-indigo-600 font-semibold hover:underline focus:outline-none cursor-pointer"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </motion.div>
  );
}

export default ToggleAuth