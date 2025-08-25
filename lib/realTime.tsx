import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useSession } from "~/context/SessionContext";
import { useData } from "~/context/DataContext";

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

export function useConfigRealTime() {
  const {units, fetchUnits} = useData();
  useEffect(() => {
    const channel = supabase
      .channel("realtime:unidades_medidas")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "unidades_medidas" },
        (payload) => {
          fetchUnits()
        }
      ).subscribe();
      return () => {
        supabase.removeChannel(channel);
      }
  }, [units]);
}
