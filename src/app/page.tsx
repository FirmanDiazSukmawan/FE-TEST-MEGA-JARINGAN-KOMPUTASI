'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormData } from '../type/Type';
import BackgroundElements from '@/component/UI/backgroundElement';
import AuthHeader from '@/component/header/AuthHeader';
import LoginForm from '@/component/LoginPage/LoginForm';
import RegisterForm from '@/component/RegisterPage/RegisterForm';
import SocialLogin from '@/component/button/Sociallogin';
import ToggleAuth from '@/component/button/ToggleAuth';
import { useAuthStore } from '@/utils/zustand/auth';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const route = useRouter()
  const LoggingIn = useAuthStore((state) => state.isLogin);

  const login = useAuthStore(state => state.login);
  const register = useAuthStore(state => state.register);
  // const loading = useAuthStore(state => state.loading);
  const loginError = useAuthStore(state => state.loginError);
  const registerError = useAuthStore(state => state.registerError);


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };



  const handleSubmit = async (data: FormData): Promise<void> => {
    if(isLogin){
     
    const res = await login(data?.email, data?.password);

    if(res?.success){
      route.push("/home")
    }
    } else {    
    const payload = {
    username: data?.username || "",
    email: data?.email || "",
    password: data?.password || "",
    confirmPassword: data?.confirmPassword || ""
  };

  const res = await register(payload);
    if(res?.success){
        setIsLogin(true)}
          }
        };

 useEffect(()=>{
  if(LoggingIn){
    route.replace('/home')
  }
 },[LoggingIn,route])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-800 flex items-center justify-center p-4">
      <BackgroundElements />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#f6f6f6] rounded-2xl shadow-lg overflow-hidden w-full max-w-md border border-gray-100"
      >
        <div className="p-8 bg-[#f6f6f6]">
          <AuthHeader isLogin={isLogin} />
          
          {isLogin ? (
            <LoginForm onSubmit={handleSubmit} message_error={loginError} />
          ) : (
            <RegisterForm onSubmit={handleSubmit} message_error={registerError} />
          )}
          
          <SocialLogin />
          <ToggleAuth isLogin={isLogin} toggleForm={toggleForm} />
        </div>
      </motion.div>
    </div>
  );
}