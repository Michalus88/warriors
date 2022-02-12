import { db, ObjectId } from "../config/mongoDb";
import { WarriorData } from "../interfaces.ts/warrior";

export class Warrior {
  id?: ObjectId;
  name: string;
  strength: number;
  defense: number;
  resilience: number;
  agility: number;
  winnings?: number;

  constructor(warriorObj: WarriorData) {
    this.id = warriorObj._id;
    this.name = warriorObj.name;
    this.strength = warriorObj.strength;
    this.defense = warriorObj.defense;
    this.resilience = warriorObj.resilience;
    this.agility = warriorObj.agility;
    this.winnings = warriorObj.winnings;
  }

  async insert() {
    return await db.collection("warriors").insertOne({
      name: this.name,
      strength: this.strength,
      defense: this.defense,
      resilience: this.resilience,
      agility: this.agility,
      winnings: 0,
    } as WarriorData);
  }

  pointsVerification() {
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
