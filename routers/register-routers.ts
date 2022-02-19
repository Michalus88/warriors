import { Router } from "express";

import { catchAsync } from "../middlewares/errors";
import registerController from "../controllers/register-controller";

export default () => {
  const registerRouter = Router();

  registerRouter
    .get("/", registerController.pageRender)
    .post("/", catchAsync(registerController.registerWarrior));

  return registerRouter;
};
