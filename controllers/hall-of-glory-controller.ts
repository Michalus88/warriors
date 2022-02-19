import { Request, Response } from "express";
import { Warrior } from "../records/warrior.record";

export default {
  async pageRender(req: Request, res: Response) {
    const warriors = await Warrior.getTop(10);
    res.render("hall-of-glory", { warriors });
  },
};
