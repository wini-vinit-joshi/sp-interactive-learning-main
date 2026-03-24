import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, User, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {}, getToken: async () => null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        console.log({u})
        const data = { uid: u.uid, displayName: u.displayName, email: u.email, photoURL: u.photoURL, getIdToken: u.getIdToken };
        localStorage.setItem("auth_user", JSON.stringify(data));
      } else {
        localStorage.removeItem("auth_user");
      }
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signOut = async () => {
    localStorage.removeItem("auth_user");
    await firebaseSignOut(auth);
  };

  const getToken = (): Promise<string | null> =>
    user ? user.getIdToken() : Promise.resolve(null);

  return <AuthContext.Provider value={{ user, loading, signOut, getToken }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
