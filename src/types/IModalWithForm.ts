// import { FormInstance } from "antd";
import { IFormItem } from "./IFormItem";

export interface IModalWithForm {
  title: string;
  isOpen: boolean;
  handleOk: (values: {[k: string]: string}) => void; 
  handleClose: () => void;
  // form: FormInstance<any>;
  formItems: IFormItem[];
  additionalButtons: JSX.Element[];
};