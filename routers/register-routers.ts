import { Router } from "express";
import registerController from "../controllers/register-controller";

export default () => {
  const registerRouter = Router();

  registerRouter
    .get("/", registerController.pageRender)
    .post("/", registerController.registerWarrior);

  return registerRouter;
};
