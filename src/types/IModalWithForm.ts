import { IFormItem } from "./IFormItem";

export interface IModalWithForm {
  title: string;
  isOpen: boolean;
  handleOk: (values: {[k: string]: string}) => void; 
  handleClose: () => void;
  formItems: IFormItem[];
  additionalButtons: JSX.Element[];
};