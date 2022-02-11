import { db, ObjectId } from "../config/mongoDb";
import { WarriorData } from "../interfaces.ts/warrior";

export class Warrior {
  id?: string;
  name: string;
  strength: number;
  defense: number;
  resilience: number;
  agility: number;

  constructor(warriorObj: WarriorData) {
    this.id = warriorObj._id;
    this.name = warriorObj.name;
    this.strength = warriorObj.strength;
    this.defense = warriorObj.defense;
    this.resilience = warriorObj.resilience;
    this.agility = warriorObj.agility;
  }

  async insert() {
    return await db.collection("warriors").insertOne({
      name: "Niszczyciel",
      strength: 5,
      defense: 2,
      resilience: 1,
      agility: 2,
    } as Warrior);
  }
}
