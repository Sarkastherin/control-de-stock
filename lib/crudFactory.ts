import { supabase } from "./supabaseClient";
export type CommonResponse<TFull> = {
  data: TFull | null;
  error: Error | null;
};
export type ListResponse<TFull> = {
  data: TFull[] | null;
  error: Error | null;
  count: number | null;
};
export type UpdateorDeleteResponse = {
  status: number | null;
  error: Error | null;
};
function parseError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === "object" && err !== null && "message" in err)
    return new Error((err as any).message);
  return new Error(String(err));
}
export const createCrud = <TFull, TInsert extends object>(table: string) => {
  return {
    insert: async (payload: TInsert): Promise<CommonResponse<TFull>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .insert([payload])
          .select();

        if (error) throw error;

        return {
          data: data?.[0] ?? null,
          error: null,
        };
      } catch (err) {
        return {
          data: null,
          error: parseError(err),
        };
      }
    },
    update: async ({
      values,
      id,
    }: {
      values: Partial<TInsert>;
      id: string;
    }): Promise<UpdateorDeleteResponse> => {
      try {
        const { error, status } = await supabase
          .from(table)
          .update(values)
          .eq("id", id)
          .select();
        if (error) throw error;
        return { status, error: null };
      } catch (err) {
        return {
          status: null,
          error: parseError(err),
        };
      }
    },
  };
};
