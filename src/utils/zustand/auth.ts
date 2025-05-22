import { create } from 'zustand';
import { UserData } from '@/type/Type';
import axiosInstance from '../axios';
import { AxiosError } from 'axios';
import { persist } from 'zustand/middleware';


interface AuthState {
  user: UserData | null;
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  isLogin: boolean;
 login: (email: string, password: string) => Promise<{ success: boolean; user?: UserData }>;
 register: (data: { username: string; email: string; password: string; confirmPassword: string }) => Promise<{ success: boolean; user?: UserData }>;
  logout: () => void;
  
}

interface LoginResponseData {
  data: {
    user_id: number |string;
    email: string;
    username: string;
    password: string;
  };
  message: string;
  token: string;
}

interface registerResponseData {
  data: {
    user_id: number |string;
    email: string;
    username: string;
    password: string;
  };
    message: string;
  
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      loginError: null,
      registerError: null,
      isLogin: false,

      login: async (email, password) => {
        set({ loading: true, loginError: null });
        try {
          const response = await axiosInstance.post<LoginResponseData>('/user/login', { email, password });

          const userLogin: UserData = {
            id: response.data.data.user_id,
            email: response.data.data.email,
            username: response.data.data.username,
            token: response.data.token,
          };

          set({
            user: userLogin,
            isLogin: true,
            loading: false,
          });

          return { success: true, user: userLogin };
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({
            loginError: err?.response?.data?.message || 'Login failed',
            loading: false,
          });
          return { success: false };
        }
      },

      register: async (data) => {
        set({ loading: true, registerError: null });
        try {
          const response = await axiosInstance.post<registerResponseData>('/user', data);

          const userData: UserData = {
            id: response.data.data.user_id,
            email: response.data.data.email,
            username: response.data.data.username,
            token: "",
          };
          set({loading: false });
          return { success: true, user: userData };
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({
            registerError: err?.response?.data?.message || 'Registration failed',
            loading: false,
          });
          return { success: false };
        }
      },

      logout: () => {
        set({ user: null, isLogin: false });
      },
    }),
    {
      name: 'auth-storage', 
      partialize: (state) => ({ user: state.user, isLogin: state.isLogin }),
    }
  )
);

