export type CommonTypesDataBase = {
  id: string;
  created_at: string;
};
export type UnitsInput = {
  descripcion: string;
  abreviatura: string;
  empresa_id: string;
  user_id: string;
};
export type FamiliesInput = {
  descripcion: string;
  empresa_id: string;
  user_id: string;
};
export type CompanyInput = {
  nombre: string;
  cuit?: string;
  web_page?: string;
  user_id: string;
}
export type UnitsType = UnitsInput & CommonTypesDataBase;
export type CompanyType = CompanyInput & CommonTypesDataBase;
export type FamiliesType = FamiliesInput & CommonTypesDataBase;