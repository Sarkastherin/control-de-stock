import { Card } from "~/components/Card";
import { Input } from "~/components/Inputs";
import { Button } from "~/components/Buttons";
import { useForm } from "react-hook-form";
import {
  companyAPI,
  profileAPI} from "lib/crud";
import { useNavigate } from "react-router";
import { useUI } from "~/context/UIContext";
import { useSession } from "~/context/SessionContext";
import { useProfileRealTime } from "lib/realTime";
import type { CompanyType } from "lib/dataTypes";
export default function FormCompany({ mode }: { mode: "create" }) {
    useProfileRealTime()
  const navigate = useNavigate();
  const { user, profile } = useSession();
  const { showModal, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyType>({
    defaultValues: {
      nombre: "",
      cuit: "",
      web_page: "",
      user_id: user?.id,
    },
  });
  const onSubmit = async (formData: CompanyType | Omit<CompanyType, "id" | "created_at">) => {
    if (!user || !profile) throw new Error("no hay usuario");
    showModal({
      variant: "loading",
      title: "⏳ Un momento...",
      bodyModal: (
        <p>
          Estamos guardando los datos. 🛠️
          <br />
          No cierres esta ventana hasta que finalice el proceso.
        </p>
      ),
    });
    if (mode === "create") {
      try {
        const payload = {
          ...formData,
          user_id: user.id,
        };
        const { data, error } = await companyAPI.insert(payload);
        if (error) throw new Error(String(error));
        if (data) {
          const { id } = data;
          const { status, error } = await profileAPI.update({
            values: { empresa_id: id },
            id: profile?.id,
          });
          if (error) throw new Error(String(error));
        }
        showModal({
          variant: "success",
          title: "✅ ¡Listo!",
          bodyModal: (
            <p>
              Los datos se guardaron correctamente. 🎉 <br />
              Puedes continuar en el Dashboard.
            </p>
          ),
          footer: {
            btnPrimary: {
              label: "Ir al Dashboard",
              handleOnClick: () => navigate("/dashboard"),
              variant: "success",
            },
          },
        });
      } catch (e) {
        console.error(e);
        showModal({
          title: "❌ Algo salió mal...",
          bodyModal: (
            <>
              <p>
                No pudimos completar la operación. 😞
                <br />
                Revisa los datos ingresados o intenta nuevamente.
              </p>
              <code>{String(e)}</code>
            </>
          ),
          variant: "error",
          footer: {
            btnSecondary: {
              label: "Cerrar",
              handleOnClick: () => closeModal(),
              variant: "error",
            },
          },
        });
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold">Crear Empresa</h1>
      <Card className="mt-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nombre de la Empresa"
            type="text"
            {...register("nombre", {
              required: {
                value: true,
                message: "Debe ingresar un nombre de empresa",
              },
            })}
            placeholder="Nombre de la Empresa"
            error={errors.nombre?.message}
          />
          <Input
            label="CUIT"
            type="text"
            {...register("cuit", {
              pattern: {
                value: /^\d{2}-\d{8}-\d{1}$/,
                message: "CUIT inválido. Formato esperado: 12-34567890-1",
              },
            })}
            placeholder="12-34567890-1"
          />
          <Input
            label="Página web"
            type="text"
            {...register("web_page")}
            placeholder="www.miempresa.com"
          />
          <div className="text-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
