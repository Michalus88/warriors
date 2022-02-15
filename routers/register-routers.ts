import { Router, Request, Response } from "express";
import { WarriorData } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";

export default () => {
  const registerRouter = Router();

  registerRouter
    .get("/", (req: Request, res: Response) => {
      res.render("register");
    })

    .post("/", async (req: Request, res: Response) => {
      const warriorRegister = req.body as WarriorData;

      const newWarrior = new Warrior(warriorRegister);
      const warr = await newWarrior.insert();
      res.render("home");
    });

  return registerRouter;
};
