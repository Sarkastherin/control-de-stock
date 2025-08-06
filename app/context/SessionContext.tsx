import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "lib/supabaseClient";
import { useProfile } from "./ProfileContext";

type SessionContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  getProfile: (auth_user_id: string) => Promise<void>;
  profile: ProfileDataType | null
};
type ProfileDataType = {
  id: string;
  created_at: string;
  auth_user_id: string;
  empresa_id?: string;
  nombre?: string;
  apellido?: string;
  email: string;
  rol: "owner";
  activo: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  useEffect(() => {
    const gestSessionAndListen = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        await checkOrCreateUser(session.user.id, session.user.email ?? "");
        await getProfile(session.user.id);
      }
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          if (newSession?.user) {
            await checkOrCreateUser(
              newSession.user.id,
              newSession.user.email ?? ""
            );
            await getProfile(newSession.user.id);
          }
          else {
            setProfile(null)
          }
        }
      );
      return () => {
        listener?.subscription.unsubscribe();
      };
    };
    gestSessionAndListen();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const checkOrCreateUser = async (auth_user_id: string, email: string) => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("id")
      .eq("auth_user_id", auth_user_id)
      .maybeSingle();
    if (!data && !error) {
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert({ auth_user_id, rol: "owner", email });
      if (insertError) {
        console.error("Error creando el usuario:", insertError.message);
      }
    } else if (error) {
      console.error("Error buscando usuario:", error.message);
    }
  };
  const getProfile = async (auth_user_id: string) => {
    let { data, error } = await supabase
      .from("usuarios")
      .select("*, empresas(*)")
      .eq("auth_user_id", auth_user_id)
      .single();
    if (error) throw new Error(error.message);
    setProfile(data)
  };
  return (
    <SessionContext.Provider value={{ user, session, loading, signOut, getProfile, profile }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
