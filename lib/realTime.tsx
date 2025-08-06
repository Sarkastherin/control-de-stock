import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useSession } from "~/context/SessionContext";

export function useProfileRealTime() {
  const { getProfile, user } = useSession();
  useEffect(() => {
    if(!user?.id) return;
    const channel = supabase
      .channel("realtime:usuarios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "usuarios" },
        (payload) => {
          if (user) {
            getProfile(user.id);
          }
        }
      ).subscribe();
      return () => {
        supabase.removeChannel(channel);
      }
  }, [user?.id]);
}
