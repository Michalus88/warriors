import { Router } from "express";
import hallOfGloryController from "../controllers/hall-of-glory-controller";

export default () => {
  const hallOfGloryRouter = Router();

  hallOfGloryRouter.get("/", hallOfGloryController.pageRender);

  return hallOfGloryRouter;
};
