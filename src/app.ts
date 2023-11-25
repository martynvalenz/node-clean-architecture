import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // Todo: await db

  new Server({
    port:envs.PORT,
    routes:AppRoutes.routes
  }).start();
}