import { db, ObjectId } from "../config/mongoDb";
import { WarriorData } from "../interfaces.ts/warrior";
import { ValidateError } from "../middlewares/errors";

export class Warrior {
  readonly id?: ObjectId;
  readonly name: string;
  readonly strength: number;
  readonly defense: number;
  readonly resilience: number;
  readonly agility: number;
  private winnings: number;

  constructor(warriorObj: WarriorData) {
    this.id = warriorObj._id;
    this.name = warriorObj.name;
    this.strength = Number(warriorObj.strength);
    this.defense = Number(warriorObj.defense);
    this.resilience = Number(warriorObj.resilience);
    this.agility = Number(warriorObj.agility);
    this.winnings = warriorObj.winnings ?? 0;
  }

  static async findOneByName(name: string): Promise<Warrior | null> {
    const warrior = (await db
      .collection("warriors")
      .findOne({ name })) as WarriorData;

    return warrior ? new Warrior(warrior) : null;
  }

  static async getAll(): Promise<Warrior[]> {
    const warriors = (await db
      .collection("warriors")
      .find()
      .toArray()) as WarriorData[];
    return warriors.map((warriorObj) => new Warrior(warriorObj));
  }

  static async getTop(limit) {
    const warriors = (await db
      .collection("warriors")
      .find({ winnings: { $gt: 0 } })
      .sort({ winnings: -1, name: 1 })
      .limit(limit)
      .toArray()) as WarriorData[];

    return warriors.map((warriorObj) => new Warrior(warriorObj));
  }

  public async insert() {
    const isTheNameTaken = this.nameVerification();

    if (isTheNameTaken) {
      throw new ValidateError(
        "Wojownik o podanej nazwie już istnieje. Musisz wybrać inną."
      );
    }

    this.pointsVerification();

    return await db.collection("warriors").insertOne({
      name: this.name,
      strength: this.strength,
      defense: this.defense,
      resilience: this.resilience,
      agility: this.agility,
      winnings: 0,
    } as WarriorData);
  }

  public winningsInc = (): void => {
    db.collection("warriors").updateOne(
      { name: String(this.name) },
      { $inc: { winnings: 1 } }
    );
  };

  private pointsVerification(): void {
    const totalPointsToDistribute = 10;
    const minPointsToGiven = 1;
    const pointsDistributed =
      this.strength + this.agility + this.defense + this.resilience;

    if (totalPointsToDistribute > pointsDistributed) {
      throw new ValidateError("Wszystkie 10 punktów musi być rozdane !");
    } else if (totalPointsToDistribute < pointsDistributed) {
      throw new ValidateError("Maxymalna liczba punktów do rozdania to 10 !");
    }

    const doesEachSkillHavePoints =
      this.strength >= minPointsToGiven &&
      this.agility >= minPointsToGiven &&
      this.defense >= minPointsToGiven &&
      this.resilience >= minPointsToGiven;

    if (!doesEachSkillHavePoints) {
      throw new ValidateError(
        "Każda umiejętność musi posiadać co najmniej 1 punkt !"
      );
    }
  }
}
