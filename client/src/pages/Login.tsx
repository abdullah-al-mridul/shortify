import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="mt-2 text-gray-400">Please sign in to your account</p>
      </div>

      <div className="bg-[#232332] p-8 rounded-lg border border-[#2A2A3C]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-[#1B1B24] border border-[#2A2A3C] rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-[#1B1B24] border border-[#2A2A3C] rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-6 py-3 bg-yellow-400 text-black rounded font-medium hover:bg-yellow-300 transition-all duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-t-4 border-[#232332] border-dashed rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 hover:text-yellow-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
