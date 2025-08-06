import { createCrud } from "./crudFactory";
type CommonTableType = { id: string; create_at: string };
export type CompanyInsertType = {
  nombre: string;
  cuit?: string;
  web_page?: string;
  user_id: string;
};
type CompanyFullType = CompanyInsertType & CommonTableType;
export type ProfileInsertType = {
  auth_user_id: string;
  empresa_id?: string;
  empresas?: CompanyFullType
  nombre?: string;
  apellido?: string;
  email: string;
  rol: "owner";
  activo: boolean;
};
export type ProfileFullType = ProfileInsertType & CommonTableType;

export const companyAPI = createCrud<CompanyFullType, CompanyInsertType>(
  "empresas"
);
export const profileAPI = createCrud<ProfileFullType, ProfileInsertType>(
  "usuarios"
);
