import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="mt-2 text-gray-400">Join us and start shortening URLs</p>
      </div>

      <div className="bg-[#232332] p-8 rounded-lg border border-[#2A2A3C]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-[#1B1B24] border border-[#2A2A3C] rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400"
              placeholder="Enter your name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-400 text-black rounded font-medium hover:bg-yellow-300 transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
