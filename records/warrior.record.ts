import { db, ObjectId } from "../config/mongoDb";
import { WarriorData } from "../interfaces.ts/warrior";

export class Warrior {
  id?: string;
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
    });
  }
}
