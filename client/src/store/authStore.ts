// importing packages
import { create } from "zustand";
import axiosInstance from "../api/axios";

// intializing interface for auth state
interface AuthState {
  checkingAuth: boolean;
  loading: boolean;
  authUser: { name: string; email: string; id?: string } | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  checkAuth: () => Promise<void>;
}

// creating auth store
const useAuthStore = create<AuthState>((set) => ({
  checkingAuth: false,
  loading: false,
  authUser: null,
  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({
        authUser: {
          name: response.data.data.name,
          email: response.data.data.email,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ checkingAuth: true });
      const response = await axiosInstance.get("/auth/me");
      set({ authUser: response.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

// exporting auth store for external use
export default useAuthStore;
