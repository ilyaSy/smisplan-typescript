import { FormInstance } from "antd";
import { IFormItem } from "./IFormItem";

export interface IModalWithForm {
  title: string;
  isOpen: boolean;
  onOk: () => void; 
  onClose: () => void;
  form: FormInstance<any>;
  formItems: IFormItem[];
};