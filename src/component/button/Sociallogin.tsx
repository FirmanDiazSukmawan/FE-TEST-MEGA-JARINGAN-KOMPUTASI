'use client';
import { SocialButtonProps } from '@/type/Type';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
    >
      {icon}
    </motion.button>
  );
};

const  SocialLogin : React.FC =()=> {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center mb-4">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <SocialButton icon={<FaGoogle />} />
        <SocialButton icon={<FaGithub />} />
        <SocialButton icon={<FaFacebook />} />
      </div>
    </motion.div>
  );
}

export default SocialLogin

