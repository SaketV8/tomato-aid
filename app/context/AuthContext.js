"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../utils/appwrite";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";

// Create a context with a default empty value
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await account.get();
  //       setUser(response);
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const fetchUser = async () => {
    try {
      const response = await account.get();
      setUser(response);
      console.log("[AUTHCONEXT] : User Found");
    } catch (error) {
      console.error("[AUTHCONTEXT] : No user found on fetch")
      console.log(error.response.code)
      console.log(error.response.message)
      console.log({...error})
      setUser(null);
    }
  };
  
  useEffect(() => {
    console.log("[AUTHCONEXT] : START Calling Fetch User");
    fetchUser();
    console.log("[AUTHCONEXT] : END Calling Fetch User");
  }, []);
  
  // Function to login
  const login = async (email, password) => {
    try {
      // await account.createEmailSession(email, password);
      await account.createEmailPasswordSession(email, password);
      fetchUser();
      router.push("/");
      console.log("[AUTHCONEXT] : Login Complete");
    } catch (error) {
      console.error("[AUTHCONEXT] : Login failed", error);
    }
  };
  
  // Function to signup
  const signup = async (name, email, password) => {
    try {
      // await account.create('unique()', email, password, name);
      await account.create(ID.unique(), email, password, name);
      fetchUser();
      // router.push('/');
      router.push("/auth/login");
      console.log("[AUTHCONEXT] : SignUp Complete");
    } catch (error) {
      console.error("[AUTHCONEXT] : Signup failed", error);
    }
  };

  // Function to logout
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("[AUTHCONEXT] : Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Defined Above
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
