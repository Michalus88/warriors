import { Router, Request, Response } from "express";
import { WarriorData } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";

export default () => {
  const warriorRouter = Router();

  warriorRouter
    .get("/", async (req: Request, res: Response) => {
      const warriors = await Warrior.getAll();

      res.send(warriors);
    })

    .post("/", async (req: Request, res: Response) => {
      const warriorRegister = req.body as WarriorData;

      const newWarrior = new Warrior(warriorRegister);
      const warr = await newWarrior.insert();
      res.send(warr);
    });

  return warriorRouter;
};
