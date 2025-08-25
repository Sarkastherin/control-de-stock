import { createCrud } from "./crudFactory";
import type { UnitsType, CompanyType, FamiliesType } from "./dataTypes";
type CommonTableType = {
  id: string;
  create_at: string;
};
export type ProfileInsertType = {
  auth_user_id: string;
  empresa_id?: string;
  empresas?: CompanyType;
  nombre?: string;
  apellido?: string;
  email: string;
  rol: "owner";
  activo: boolean;
};
export type ProfileType = ProfileInsertType & CommonTableType;

export const companyAPI = createCrud<CompanyType>("empresas");
export const profileAPI = createCrud<ProfileType>("usuarios");

export const unitsAPI = createCrud<UnitsType>("unidades_medidas");
export const familiesAPI = createCrud<FamiliesType>("familias");
