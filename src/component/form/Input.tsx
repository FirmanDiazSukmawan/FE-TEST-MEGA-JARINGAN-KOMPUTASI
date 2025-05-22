'use client';
import { motion } from 'framer-motion';
import { ReactNode, ChangeEvent } from 'react';

interface InputProps {
  icon: ReactNode;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  delay?: number;
}

const Input: React.FC<InputProps> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="mb-4"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </motion.div>
  );
};

export default Input;
