export interface IFormItem {
  disabled: boolean;
  label: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'time' | 'datetime' | 'select';
  rules?: {
    required: boolean;
    message: string;
  }[]
}