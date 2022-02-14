import { Router, Request, Response } from "express";

export default () => {
  const homeRouter = Router();

  homeRouter.get("/", async (req: Request, res: Response) => {
    res.render("home");
  });

  return homeRouter;
};
