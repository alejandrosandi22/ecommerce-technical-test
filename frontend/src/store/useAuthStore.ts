import {
  getProfile,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from '@/services/authService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from './useCartStore';

interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

type SetFunction = (
  partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>),
) => void;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          await loginApi({ email, password });
          await fetchProfile(set);

          const cartStore = useCartStore.getState();
          await cartStore.loadCartFromServer();
        } catch (err: unknown) {
          let message = 'Unknown error';
          if (err instanceof Error) {
            message = err.message;
          } else if (
            typeof err === 'object' &&
            err !== null &&
            'message' in err
          ) {
            message = String(err.message);
          }
          set({ error: message, loading: false });
        }
      },

      signup: async (username, email, password) => {
        set({ loading: true, error: null });
        try {
          await registerApi({ username, email, password });
          set({ loading: false });
        } catch (err: unknown) {
          let message = 'Unknown error';
          if (err instanceof Error) {
            message = err.message;
          } else if (
            typeof err === 'object' &&
            err !== null &&
            'message' in err
          ) {
            message = String(err.message);
          }
          set({ error: message, loading: false });
        }
      },

      fetchProfile: async () => {
        try {
          const profile = await getProfile();
          if (profile && 'username' in profile && 'email' in profile) {
            set({ user: profile as User });
          } else {
            set({ user: null });
          }
        } catch {
          set({ user: null });
        }
      },

      logout: async () => {
        try {
          await logoutApi();
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

const fetchProfile = async (set: SetFunction) => {
  try {
    const profile = await getProfile();

    if (profile && 'username' in profile && 'email' in profile) {
      set({ user: profile as User });
    } else {
      set({ user: null });
    }
  } catch {
    set({ user: null });
  }
};
