import { Link as LinkIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="min-h-screen bg-[#1B1B24] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#232332] border-b border-[#2A2A3C]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-black">
                  <LinkIcon />
                </span>
              </div>
              <span className="text-yellow-400">Shortify</span>
            </Link>
            <div className="space-x-4">
              {!isAuthPage && (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
