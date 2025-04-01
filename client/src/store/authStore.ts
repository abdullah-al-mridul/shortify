// importing packages
import { create } from "zustand";
import axiosInstance from "../api/axios";

// intializing interface for auth state
interface AuthState {
  loading: boolean;
  authUser: { name: string; email: string } | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
}

// creating auth store
const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  authUser: null,
  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

// exporting auth store for external use
export default useAuthStore;
