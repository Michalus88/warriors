import { Request, Response } from "express";
import { FightersNamesReq } from "../interfaces.ts/warrior";
import { Warrior } from "../records/warrior.record";
import { NoFoundError, ValidateError } from "../middlewares/errors";

type FighterName = string | undefined;
type AtackerNumber = 1 | 2;
interface Fighter {
  record: Warrior;
  hp: number;
  dp: number;
  shield: number | null;
}

export class Arena {
  private warrior1!: Fighter;
  private warrior2!: Fighter;
  private whoIsAttacking!: AtackerNumber;
  public logs: string[] = [];

  public pageRender = async (req: Request, res: Response): Promise<void> => {
    const warriors = await Warrior.getAll();

    res.render("arena/main", { warriors });
  };

  public fight = async (req: Request, res: Response): Promise<void> => {
    const { firstFighterName, secondFighterName } =
      req.body as FightersNamesReq;
    this.validate(firstFighterName, secondFighterName);
    await this.setWarriors(
      firstFighterName as string,
      secondFighterName as string
    );
    this.fightResult();

    res.render("arena/fight", { logs: this.logs });
  };

  private setWarriors = async (
    firstFighterName: string,
    secondFighterName: string
  ): Promise<void> => {
    this.whoIsAttacking = this.attackerDraw();
    const warrior1 = await Warrior.findOneByName(firstFighterName);
    const warrior2 = await Warrior.findOneByName(secondFighterName);
    if (this.warrior1 === null || this.warrior2 === null) {
      throw new NoFoundError("Nie posiadamy zawodnika o podanej nazwie");
    }
    this.warrior1 = this.setWarrior(warrior1 as Warrior);
    this.warrior2 = this.setWarrior(warrior2 as Warrior);
  };

  private attackerDraw = (): AtackerNumber =>
    Math.floor(Math.random() * (2 - 1 + 1) + 1) as AtackerNumber;

  private setWarrior = (warrior: Warrior): Fighter => ({
    record: warrior,
    hp: warrior.resilience * 10,
    dp: warrior.defense,
    shield:
      warrior.strength < warrior.defense + warrior.agility
        ? warrior.defense
        : null,
  });

  private fightResult = (): void => {
    this.logs = [];
    let winner!: Fighter;
    let attacker = this.whoIsAttacking === 1 ? this.warrior1 : this.warrior2;
    let defender = this.whoIsAttacking === 1 ? this.warrior2 : this.warrior1;

    do {
      if (attacker.shield && defender.shield && defender.shield > 0) {
        defender.dp -= attacker.record.strength;
        if (defender.dp < 0) {
          defender.hp -= -defender.dp;
          this.logs.push(
            `Obrona ${defender.record.name} zosta??a prze??amana i ${attacker.record.name} zada?? obra??enia w wysoko??ci 
            ${attacker.record.strength}`
          );
        } else {
          this.logs.push(`Obrona przez ${defender.record.name} powiod??a si??.`);
        }
      } else {
        defender.hp -= attacker.record.strength;
        this.logs.push(
          `${attacker.record.name} zada?? obra??enia ${defender.record.name} w wysoko??ci ${attacker.record.strength}`
        );
      }
      if (defender.hp >= 0) {
        winner = attacker;
      }
      [attacker, defender] = [defender, attacker];
    } while (attacker.hp >= 0);
    this.logs.push(`Zwyci????a ${winner.record.name} !!!`);

    winner.record.winningsInc();
  };

  private validate = (
    firstFighterName: FighterName,
    secondFighterName: FighterName
  ): void => {
    if (
      firstFighterName === (undefined || "") ||
      secondFighterName === (undefined || "")
    ) {
      throw new ValidateError("Trzeba wybra?? dw??ch zawodnik??");
    }

    if (firstFighterName === secondFighterName) {
      throw new ValidateError(
        "W jednej walce nie mo??e by?? wybrany dwa razy ten sam wojownik"
      );
    }
  };
}

export default new Arena();
