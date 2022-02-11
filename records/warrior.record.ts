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
    this.strength = warriorObj.strengrt;
    this.defense = warriorObj.defense;
    this.resilience = warriorObj.resilience;
    this.agility = warriorObj.agility;
  }
}
