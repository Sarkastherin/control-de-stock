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
export type CrudMethod<TFull> = {
  insert: (data: Omit<TFull, "id" | "created_at">) => Promise<CommonResponse<TFull>>;
  update: (args: { id: string; values: Partial<TFull> }) => Promise<UpdateorDeleteResponse>;
  remove: (args: { id: string }) => Promise<UpdateorDeleteResponse>;
};
function parseError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === "object" && err !== null && "message" in err)
    return new Error((err as any).message);
  return new Error(String(err));
}
export const createCrud = <TFull extends object>(table: string) => {
  return {
    insert: async (payload: Omit<TFull, "id" | "created_at">): Promise<CommonResponse<TFull>> => {
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
      values: Partial<Omit<TFull, "id" | "created_at">>;
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
    remove: async ({ id }: { id: string }): Promise<UpdateorDeleteResponse> => {
      try {
        const { status, error } = await supabase
          .from(table)
          .delete()
          .eq("id", id);

        if (error) throw error;
        return { status, error: null };
      } catch (err: any) {
        if (err.code === "23503") {
          return {
            status: null,
            error: new Error(
              "No se puede eliminar este registro porque está siendo utilizado en otra tabla."
            ),
          };
        }

        return {
          status: null,
          error: err instanceof Error
              ? err
              : new Error(
                  typeof err === "object" && err !== null && "message" in err
                    ? (err as any).message
                    : String(err)
                ),
        };
      }
    },
  };
};
