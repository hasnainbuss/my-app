import { BaseModel } from "./BaseModel";

export interface LeadModel extends BaseModel {
  id: number;
  phoneNumber: number;
  website: string;
  quoteType: string;
  date: string;
}
