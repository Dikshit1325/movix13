import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  picture: string;
  providers: string[];
  primaryProvider: "local" | "google";
  createdAt: string;
  updatedAt: string;
  bookingsCount?: number;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

type ProfileResponse = {
  user: AuthUser;
};

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "movixAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistSession = useCallback((session: AuthResponse) => {
    setUser(session.user);
    setToken(session.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const refreshProfile = useCallback(
    async (sessionToken?: string | null) => {
      const activeToken = sessionToken ?? token;
      if (!activeToken) return;

      const profile = await apiRequest<ProfileResponse>("/auth/me", {
        token: activeToken,
      });

      const session = {
        token: activeToken,
        user: profile.user,
      };

      persistSession(session);
    },
    [persistSession, token],
  );

  useEffect(() => {
    let cancelled = false;

    const initializeSession = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(stored) as AuthResponse;
        setUser(parsed.user);
        setToken(parsed.token);
        await refreshProfile(parsed.token);
      } catch {
        clearSession();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void initializeSession();

    return () => {
      cancelled = true;
    };
  }, [clearSession, refreshProfile]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const session = await apiRequest<AuthResponse>("/auth/login", {
          method: "POST",
          body: { email, password },
        });
        persistSession(session);
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const session = await apiRequest<AuthResponse>("/auth/register", {
          method: "POST",
          body: { name, email, password },
        });
        persistSession(session);
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const loginWithGoogle = useCallback(
    async (credential: string) => {
      setIsLoading(true);
      try {
        const session = await apiRequest<AuthResponse>("/auth/google", {
          method: "POST",
          body: { credential },
        });
        persistSession(session);
      } finally {
        setIsLoading(false);
      }
    },
    [persistSession],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      loginWithGoogle,
      refreshProfile: () => refreshProfile(),
      logout,
    }),
    [isLoading, login, loginWithGoogle, logout, refreshProfile, register, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
