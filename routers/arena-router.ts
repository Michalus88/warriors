import { Router } from "express";

import { catchAsync } from "../middlewares/errors";
import arenaController from "../controllers/arena-controller";

export default () => {
  const arenaRouter = Router();

  arenaRouter
    .get("/", catchAsync(arenaController.pageRender))
    .post("/", catchAsync(arenaController.fight));

  return arenaRouter;
};
