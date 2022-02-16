import { Request, Response } from "express";
import { FightersNamesReq } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";

type FighterName = string | undefined;

export class Arena {
  private warrior1: Warrior | null = null;
  private warrior2: Warrior | null = null;

  pageRender = async (req: Request, res: Response) => {
    const warriors = await Warrior.getAll();

    res.render("arena/main", { warriors });
  };

  fight = async (req: Request, res: Response) => {
    const { firstFighter, secondFighter } = req.body as FightersNamesReq;
    await this.validate(firstFighter, secondFighter);
    await this.setWarriors(firstFighter, secondFighter);
    console.log(this.warrior1, this.warrior2);

    res.render("arena/fight");
  };

  setWarriors = async (firstFighter, secondFighter) => {
    this.warrior1 = await Warrior.findOneByName(firstFighter);
    this.warrior2 = await Warrior.findOneByName(secondFighter);
    if (this.warrior1 === null || this.warrior2 === null) {
      throw new Error("Nie posiadamy zawodnika o podanej nazwie");
    }
  };

  validate = async (firstFighter: FighterName, secondFighter: FighterName) => {
    if (
      firstFighter === (undefined || "") ||
      secondFighter === (undefined || "")
    ) {
      throw new Error("Trzeba wybrać dwóch zawodnikó");
    }

    if (firstFighter === secondFighter) {
      throw new Error(
        "W jednej walce nie może być wybrany dwa razy ten sam wojownik"
      );
    }
  };
}

export default new Arena();
