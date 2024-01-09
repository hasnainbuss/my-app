import { ColumnModel } from "./ColumnModel";

export interface TablePreferenceModel {
  name: string;
  pageSize: number;
  columns: ColumnModel[];
}
