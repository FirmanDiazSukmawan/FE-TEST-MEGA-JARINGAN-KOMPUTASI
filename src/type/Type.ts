import { ReactNode } from "react";

export interface RegisterFormProps {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword:string;
  }) => void;
  message_error:null | string
}

export interface SubmitButtonProps {
  text: string;
  delay?: number;
}

export interface SocialButtonProps {
  icon: ReactNode;
}

export interface ToggleAuthProps {
  isLogin: boolean;
  toggleForm: () => void;
}

export interface AuthHeaderProps {
  isLogin: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  message_error:null |string
}

export interface FormData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?:string;
}

export interface OrderData {
  id: number;
  image: string | File;
  name: string;
  quantity: string | number;     
  weight: string | number;      
  description: string;
  user_id?: number | null;
}


export type OrderFields = Omit<OrderData, 'id'>;

export interface UserData {
  id: string | number;
  username: string;
  email: string;
  token:string
}
