import { createContext, useEffect, useState, useContext } from "react";
import type { UnitsType, FamiliesType } from "lib/dataTypes";
import { supabase } from "lib/supabaseClient";
type DataContextType = {
  units: UnitsType[] | undefined;
  fetchUnits: () => Promise<void>;
  families: FamiliesType[] | undefined;
  fetchFamilies: () => Promise<void>;
};
const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [units, setUnits] = useState<UnitsType[] | undefined>(undefined);
  const [families, setFamilies] = useState<FamiliesType[] | undefined>(
    undefined
  );
  const fetchUnits = async () => {
    const { data, error } = await supabase.from("unidades_medidas").select("*");
    if (error) {
      console.error("Error fetching units:", error);
    } else {
      setUnits(data as UnitsType[]);
    }
  };
  const fetchFamilies = async () => {
    const { data, error } = await supabase.from("familias").select("*");
    if (error) {
      console.error("Error fetching units:", error);
    } else {
        console.log("Fetched families:", data);
      setFamilies(data as FamiliesType[]);
    }
  };
  useEffect(() => {
    fetchUnits();
    fetchFamilies();
  }, []);
  return (
    <DataContext.Provider value={{ units, fetchUnits, families, fetchFamilies }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
