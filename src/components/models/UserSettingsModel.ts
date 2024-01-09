
import { BaseModel } from "./BaseModel";
import { TablePreferenceModel } from "./TablePreferenceModel";

export interface UserSettingsModel extends BaseModel {
  userId: string;
  userName: string;
  homePage?: string;
  tablePreferences: TablePreferenceModel[];
}
