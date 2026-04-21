"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import Cookies from "js-cookie";
import Loader from "@/components/Shared/Loader";

interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
  // profile: any;
  // avatar: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // const axiosSecure = useAxiosSecure();

  /* ======================
      FUTURE BACKEND INTEGRATION
      When your backend is ready, uncomment the imports and logic below.
  ====================== */
  
  /*
  const accessToken = Cookies.get("accessToken");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    enabled: !!accessToken,
    queryFn: async () => {
      // This will use the axiosSecure instance with interceptors
      const res = await axiosSecure.get("/auth/me/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1
  });

  const avatar = profile?.profile_image
    ? `https://your-api-domain.com${profile.profile_image}`
    : "/default-avatar.png";
  */

  // login logic
  const login = (data: any) => {
    /*
    const userData = data.user;
    const tokens = data.tokens;

    // Use Cookies for the token (better for SSR/Next.js)
    Cookies.set("accessToken", tokens.access, { expires: 7 }); 
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    */
    console.log("Mock Login triggered. Data:", data);
    setUser(data?.user || { name: "Mock User", email: data?.email });
  };

  // logout logic
  const logout = () => {
    /*
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    */
    console.log("Mock Logout triggered");
    setUser(null);
  };

  useEffect(() => {
    // Initial check for existing session on page load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    login,
    logout,
    loading: loading, // Change to: loading || isLoading when backend ready
    // profile,
    // avatar
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading && <Loader variant="splash" message="Loading Dashboard..." />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
