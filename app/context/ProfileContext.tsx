import { createContext, useContext, useState } from "react";
import { supabase } from "lib/supabaseClient";

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

type ProfileContextType = {
  getProfile: (auth_user_id: string) => Promise<void>;
  profile: ProfileDataType | null
};
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  const getProfile = async (auth_user_id: string) => {
    let { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("auth_user_id", auth_user_id)
      .single();
    if (error) throw new Error(error.message);
    setProfile(data)
  };
  return (
    <ProfileContext.Provider value={{ getProfile, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
