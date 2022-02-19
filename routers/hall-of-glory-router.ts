import { Router } from "express";

import { catchAsync } from "../middlewares/errors";
import hallOfGloryController from "../controllers/hall-of-glory-controller";

export default () => {
  const hallOfGloryRouter = Router();

  hallOfGloryRouter.get("/", catchAsync(hallOfGloryController.pageRender));

  return hallOfGloryRouter;
};
