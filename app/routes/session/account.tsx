import type { Route } from "../+types/home";
import { Input } from "~/components/Inputs";
import FooterForms from "~/components/FooterForms";
import { useForm } from "react-hook-form";
import { useSession } from "~/context/SessionContext";
import type { ProfileFullType } from "lib/crud";
import { useProfileRealTime } from "lib/realTime";
import { useState } from "react";
import { updateSingleRow } from "~/utils/updatesSingleRow";
import { profileAPI } from "lib/crud";
import type { DirtyMap } from "~/utils/updatesSingleRow";
import { useUI } from "~/context/UIContext";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "StokAR: Tu Cuenta" },
    { name: "description", content: "Account" },
  ];
}

export default function Account() {
  useProfileRealTime();
  const { showModal, closeModal } = useUI();
  const { profile } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ProfileFullType>({
    defaultValues: profile ?? {},
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const onSubmit = async (data: ProfileFullType) => {
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
    try {
      await updateSingleRow({
        dirtyFields: dirtyFields as DirtyMap<ProfileFullType>,
        formData: data,
        onUpdate: profileAPI.update,
      });
      showModal({
        variant: "success",
        title: "✅ ¡Listo!",
        bodyModal: <p>Los datos se guardaron correctamente. 🎉</p>,
        footer: {
          btnPrimary: {
            label: "Aceptar",
            handleOnClick: () => closeModal(),
            variant: "primary",
          },
        },
      });
    } catch (e) {
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
  };
  return (
    <>
      <h2 className="text-xl font-semibold">Tu información</h2>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={!isEditMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              type="text"
              {...register("nombre")}
            />
            <Input
              label="Apellido"
              placeholder="Tu apellido"
              type="text"
              {...register("apellido")}
            />

            <Input
              label="Correo electrónico"
              type="email"
              disabled
              {...register("email")}
            />
            <Input label="Rol" type="text" disabled {...register("rol")} />
            <Input
              label="Empresa"
              type="text"
              disabled
              {...register("empresas.nombre")}
            />
          </div>
        </fieldset>
        <FooterForms
          isNew={false}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode((prev) => !prev)}
        />
      </form>
    </>
  );
}
