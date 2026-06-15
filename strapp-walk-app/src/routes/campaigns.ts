import { Route as rootRoute } from "./__root";
import { RoutesPage } from "./routes";
import { Route as TanStackRoute } from "@tanstack/react-router";

export const Route = new TanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/campaigns",
  component: RoutesPage,
});
