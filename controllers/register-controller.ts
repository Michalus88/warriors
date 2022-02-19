import { Request, Response } from "express";
import { WarriorData } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";

export default {
  pageRender(req: Request, res: Response) {
    res.render("register");
  },

  async registerWarrior(req: Request, res: Response) {
    const warriorRegister = req.body as WarriorData;
    const newWarrior = new Warrior(warriorRegister);
    await newWarrior.insert();

    res.render("home");
  },
};
