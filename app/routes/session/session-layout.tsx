import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { useSession } from "~/context/SessionContext";
import ProtectedRoute from "~/components/auth/ProtectedRoute";
import { useEffect } from "react";
import { Card } from "~/components/Card";
import { ButtonLink } from "~/components/Buttons";
type MenuLinkProps = {
  to: string;
  children: React.ReactNode;
};
export default function LayoutSession() {
  const { user, profile } = useSession();
  const MenuLink = ({ to, children }: MenuLinkProps) => {
    return (
      <NavLink
        className={({ isActive }) =>
          `block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-primary-light ${
            isActive ? "bg-gray-200 dark:bg-gray-800 text-primary-light" : ""
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    );
  };
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex h-screen flex-col justify-between border-e border-border bg-white dark:bg-gray-900">
          <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-200 dark:bg-gray-800 text-xs">
              <h1 className="text-center text-xl font-semibold">
                Stock<span className="text-primary">AR</span>
              </h1>
            </span>

            <ul className="mt-6 space-y-1">
              <li>
                <MenuLink to="/dashboard">Inicio</MenuLink>
              </li>

              <li>
                <MenuLink to="/products">Productos</MenuLink>
              </li>

              <li>
                <MenuLink to="/stock-movement">Movimientos</MenuLink>
              </li>
              <li>
                <MenuLink to="/account">Cuenta</MenuLink>
              </li>
            </ul>
          </div>

          {/* <div className="sticky inset-x-0 bottom-0 border-t border-border">
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-900 p-4 hover:bg-gray-50"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="size-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span> eric@frusciante.com </span>
                </p>
              </div>
            </a>
          </div> */}
        </div>

        {/* Main content */}
        <main className="relative flex-1 px-6 py-8 md:px-10 overflow-y-auto">
          {profile && profile.empresa_id ? (
            <Outlet />
          ) : (
            <Card>
              <h2 className="text-lg font-bold">
                🛑 Aún no tienes una empresa creada
              </h2>
              <p className="text-sm mt-6">
                Para comenzar a usar{" "}
                <strong>
                  Stock<span className="text-primary">AR</span>
                </strong>
                , primero debes crear tu empresa. Esto te permitirá gestionar
                productos, usuarios y más.
              </p>
              <div className="border-t border-border mt-4 pt-3 text-end">
                <ButtonLink href="/create-company">Crear Empresa</ButtonLink>
              </div>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
