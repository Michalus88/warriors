import { db, ObjectId } from "../config/mongoDb";
import { WarriorData } from "../interfaces.ts/warrior";

export class Warrior {
  private id?: ObjectId;
  private name: string;
  private strength: number;
  private defense: number;
  private resilience: number;
  private agility: number;
  private winnings?: number;
  private healthyPoints: number;
  private canUsePlate: boolean;

  constructor(warriorObj: WarriorData) {
    this.id = warriorObj._id;
    this.name = warriorObj.name;
    this.strength = Number(warriorObj.strength);
    this.defense = Number(warriorObj.defense);
    this.resilience = Number(warriorObj.resilience);
    this.agility = Number(warriorObj.agility);
    this.winnings = warriorObj.winnings ?? 0;
    this.healthyPoints = this.resilience * 10;
    this.canUsePlate = this.strength < this.defense + this.agility;
  }

  static async findOneByName(name: string): Promise<Warrior | null> {
    const warrior = (await db
      .collection("warriors")
      .findOne({ name })) as WarriorData;

    return warrior ? new Warrior(warrior) : null;
  }

  static async getAll(): Promise<Warrior[] | []> {
    const warriors = (await db
      .collection("warriors")
      .find()
      .toArray()) as WarriorData[];
    return warriors.map((warriorObj) => new Warrior(warriorObj));
  }

  async insert() {
    const isTheNameTaken = await Warrior.findOneByName(this.name);

    if (isTheNameTaken) {
      throw new Error("Sorry. A warrior with the given name already exists...");
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

  pointsVerification(): void {
    const totalPointsToDistribute = 10;
    const minPointsToGiven = 1;
    const pointsDistributed =
      this.strength + this.agility + this.defense + this.resilience;

    if (totalPointsToDistribute > pointsDistributed) {
      throw new Error("All points must be distributed !");
    } else if (totalPointsToDistribute < pointsDistributed) {
      throw new Error("You cannot distribute more than ten points !");
    }

    const doesEachSkillHavePoints =
      this.strength >= minPointsToGiven &&
      this.agility >= minPointsToGiven &&
      this.defense >= minPointsToGiven &&
      this.resilience >= minPointsToGiven;

    if (!doesEachSkillHavePoints) {
      throw new Error("Each skill must get at least one point !");
    }
  }
}
