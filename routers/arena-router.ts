import { Router } from "express";
import arenaController from "../controllers/arena-controller";

export default () => {
  const arenaRouter = Router();

  arenaRouter
    .get("/", arenaController.pageRender)
    .post("/", arenaController.fight);

  return arenaRouter;
};
