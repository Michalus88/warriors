import { Router, Request, Response } from "express";

export default () => {
  const homeRouter = Router();

  homeRouter.get("/", (req: Request, res: Response) => {
    res.render("home");
  });

  return homeRouter;
};
