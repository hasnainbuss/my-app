export enum LeadStatus {
  Pending = 1,
  Converted = 2,
}

export enum FormInputTypes {
  Select = 1,
  Text = 2,
  Checkbox = 3,
  DatePicker = 4,
  Hidden = 5,
  Password = 6,
  Email = 7,
  Number= 8,
}

export enum ValidationType {
  required = 1,
  isEmail = 2,
  minLength = 3,
  maxLength = 4,
  isTrue = 5,
  passwordMatch = 6,
}
