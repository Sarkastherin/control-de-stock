import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/auth/auth-layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("confirm-email", "routes/auth/confirm-email.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
  ]),
  layout("routes/session/session-layout.tsx", [
    route("dashboard", "routes/session/dashboard.tsx"),
    route("products", "routes/session/products/products.tsx"),
    route("stock-movement", "routes/session/stock-movement.tsx"),
    route("account", "routes/session/account.tsx"),
  ]),
  route("create-company","routes/session/create-company.tsx")
] satisfies RouteConfig;
