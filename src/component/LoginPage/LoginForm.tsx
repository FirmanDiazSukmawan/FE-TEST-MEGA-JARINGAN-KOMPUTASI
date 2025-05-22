'use client';
import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../form/Input';
import SubmitButton from '../button/Button';
import { LoginFormProps } from '@/type/Type';
import ErrorDisplay from '../common/Error';

export default function LoginForm({ onSubmit,message_error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        icon={<FaEnvelope className="text-gray-400" />}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        delay={0.1}
      />
      
      <Input
        icon={<FaLock className="text-gray-400" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        delay={0.2}
      />

      <ErrorDisplay message={message_error} />
      
      <SubmitButton text="Sign In" delay={0.3} />
    </form>
  );
}