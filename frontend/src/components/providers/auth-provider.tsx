"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  api,
  clearAuth,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
  type LoginInput,
  type RegisterInput,
  type Role,
  type User,
} from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  role: Role | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from localStorage after mount to avoid SSR mismatches.
  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      setUser(storedUser);
      // Refresh in the background to pick up role/profile changes.
      api.users
        .me()
        .then((fresh) => {
          setUser(fresh);
          setStoredUser(fresh);
        })
        .catch(() => {
          /* request helper handles 401 + redirect */
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const res = await api.auth.login(input);
    setToken(res.accessToken);
    setStoredUser(res.user);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const res = await api.auth.register(input);
    setToken(res.accessToken);
    setStoredUser(res.user);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
      /* ignore network/logout errors, clear locally regardless */
    }
    clearAuth();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const fresh = await api.users.me();
    setUser(fresh);
    setStoredUser(fresh);
  }, []);

  const updateUser = useCallback((updated: User) => {
    setUser(updated);
    setStoredUser(updated);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: user?.role ?? null,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
      updateUser,
    }),
    [user, loading, login, register, logout, refreshUser, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
