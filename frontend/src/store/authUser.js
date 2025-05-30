import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            console.log("Sending signup credentials:", credentials);
            const response = await axios.post("http://localhost:5000/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            console.error("Signup error:", error); // Added for debugging
            toast.error(error.response?.data?.message || "Signup failed");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            console.log("Sending login credentials:", credentials);
            const response = await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
        } catch (error) {
            console.error("Login error:", error); // Added for debugging
            set({ isLoggingIn: false, user: null });
            toast.error(error.response?.data?.message || "Login failed");
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("http://localhost:5000/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error); // Added for debugging
            set({ isLoggingOut: false });
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("http://localhost:5000/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.error("Auth check error:", error); // Added for debugging
            set({ isCheckingAuth: false, user: null });
            // Optional: toast.error(error.response?.data?.message || "An error occurred");
        }
    },
}));