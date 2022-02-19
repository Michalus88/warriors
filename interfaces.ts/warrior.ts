import { ObjectId } from "mongodb";

export interface WarriorData {
  _id?: ObjectId;
  name: string;
  strength: number;
  defense: number;
  resilience: number;
  agility: number;
  winnings: number;
}

export interface FightersNamesReq {
  firstFighter: string | undefined;
  secondFighter: string | undefined;
}
