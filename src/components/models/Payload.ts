export interface ISearchPayload {
  searchBy: string;
  searchTerm: string | number;
}

export interface IBasePayload {}

export interface IKeyPayload extends IBasePayload {
  key: string;
}

export interface INumberPayload extends IBasePayload {
  number: number;
}

export interface INumberListPayload extends IBasePayload {
  numbers: number[];
}

export interface IStringPayload extends IBasePayload {
  key?: string;
  string: string;
}

export interface IBooleanPayload extends IBasePayload {
  key?: string;
  boolean: boolean;
}

export interface IErrorPayload extends IBasePayload {
  key?: string;
  error: Error;
  message?: string;
}
export interface IUpdateUserSettingsItemPayload {
  itemName: string;
  visible?: boolean;
  order?: number;
  sortable: boolean;
}
