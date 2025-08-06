import { Outlet } from "react-router";
export default function LayoutAuth() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center px-6 py-8 lg:px-8 mt-10">
        <h1 className="text-center text-4xl font-semibold">
          Stock<span className="text-primary">AR</span>
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
