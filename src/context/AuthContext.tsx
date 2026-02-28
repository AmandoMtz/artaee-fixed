// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthSession, User } from '../types';
import { api } from '../api/client';

interface AuthContextValue {
  session: AuthSession | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (full_name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const LS_KEY = 'artaee_auth';

function loadSession(): AuthSession | null {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? 'null'); }
  catch { return null; }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(loadSession);

  const saveSession = (s: AuthSession) => {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
    setSession(s);
  };

  const login = useCallback(async (email: string, password: string) => {
    const s = await api.login({ email, password });
    saveSession(s);
  }, []);

  const register = useCallback(async (full_name: string, email: string, password: string) => {
    const s = await api.register({ full_name, email, password });
    saveSession(s);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
