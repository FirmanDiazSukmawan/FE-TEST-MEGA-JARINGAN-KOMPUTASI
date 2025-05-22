import { AuthHeaderProps } from '@/type/Type';
import { motion } from 'framer-motion';

export default function AuthHeader({ isLogin }: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <p className="text-gray-600">
        {isLogin ? 'Sign in to continue' : 'Create account to continue'}
      </p>
    </motion.div>
  );
}