import { Router, Request, Response } from "express";
import { WarriorData } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";

export default () => {
  const warriorRouter = Router();

  warriorRouter.post("/", async (req: Request, res: Response) => {
    const warriorDto = req.body as WarriorData;

    const newWarrior = new Warrior(warriorDto);
    const warr = await newWarrior.insert();
    res.send(warr);
  });

  return warriorRouter;
};
