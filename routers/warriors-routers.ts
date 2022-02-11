import { Router, Request, Response } from "express";
import { Warrior } from "../records/warrior.record";

export default () => {
  const warriorRouter = Router();

  warriorRouter.post("/", async (req: Request, res: Response) => {
    const newWarrior = new Warrior({
      name: "Niszczyciel",
      strength: 5,
      defense: 2,
      resilience: 1,
      agility: 2,
    });
    const warr = await newWarrior.insert();
    res.send(warr);
  });

  return warriorRouter;
};
