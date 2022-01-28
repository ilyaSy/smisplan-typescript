import { TDataTypes } from "./TDataTypes";

export interface IFormItem {
  disabled: boolean;
  label: string;
  name: string;
  type: TDataTypes;
  rules?: {
    required: boolean;
    message: string;
  }[]
}
