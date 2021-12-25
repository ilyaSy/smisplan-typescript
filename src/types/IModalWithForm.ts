import { IFormItem } from "./IFormItem";
import { TData } from "./TData";

export interface IModalWithForm {
  title: string;
  okButtonTitle?: string
  isOpen: boolean;
  handleOk: (values: {[k: string]: string}) => void; 
  handleClose: () => void;
  formItems: IFormItem[];
  additionalButtons: JSX.Element[];
  initialValues?: TData;
};