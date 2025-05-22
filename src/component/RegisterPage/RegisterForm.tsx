'use client';
import { FormEvent, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../form/Input';
import SubmitButton from '../button/Button';
import { RegisterFormProps } from '@/type/Type';
import ErrorDisplay from '../common/Error';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword:string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit,message_error }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword:"",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);  
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        icon={<FaUser className="text-gray-400" />}
        type="text"
        placeholder="Username"
        value={formData.username}            
        onChange={e => handleChange('username', e.target.value)} 
        delay={0}
      />

      <Input
        icon={<FaEnvelope className="text-gray-400" />}
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={e => handleChange('email', e.target.value)}
        required
        delay={0.1}
      />

      <Input
        icon={<FaLock className="text-gray-400" />}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={e => handleChange('password', e.target.value)}
        required
        delay={0.2}
      />

      <Input
        icon={<FaLock className="text-gray-400" />}
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={e => handleChange('confirmPassword', e.target.value)}
        required
        delay={0.2}
      />
      <ErrorDisplay message={message_error} />
      <SubmitButton text="Sign Up" delay={0.3} />
    </form>
  );
};

export default RegisterForm;
