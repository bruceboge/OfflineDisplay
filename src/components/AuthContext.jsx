import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or initial load
    const storedUser = localStorage.getItem("offline_user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setUserProfile({ name: "Demo Admin", role: "Admin" });
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    // Mock Login
    const fakeUser = {
        uid: "offline-123",
        email: email,
    };
    localStorage.setItem("offline_user", JSON.stringify(fakeUser));
    setCurrentUser(fakeUser);
    setUserProfile({ name: "Demo Admin", role: "Admin" });
    return true;
  }

  async function logout() {
    localStorage.removeItem("offline_user");
    setCurrentUser(null);
    setUserProfile(null);
  }

  const value = {
    currentUser,
    userProfile,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}