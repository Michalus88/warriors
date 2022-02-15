import { Router, Request, Response } from "express";
import { Warrior } from "../records/warrior.record";

export default () => {
  const hallOfGloryRouter = Router();

  hallOfGloryRouter.get("/", async (req: Request, res: Response) => {
    const warriors = await Warrior.getAll();
    res.render("hall-of-glory", { warriors });
  });

  return hallOfGloryRouter;
};
