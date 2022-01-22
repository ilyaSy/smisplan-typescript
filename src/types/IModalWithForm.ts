import { IFormItem } from "./IFormItem";
import { TButton } from "./TButton";
import { TData } from "./TData";
import { TDictionary } from "./TDictionary";

export interface IModalWithForm {
  title: string;
  okButtonTitle?: string
  isOpen: boolean;
  handleOk: (values: {[k: string]: string}) => void;
  handleClose: () => void;
  formItems: IFormItem[];
  // additionalButtons: JSX.Element[];
  additionalButtons: TButton[];
  initialValues?: TData;
  modalDictionary?: TDictionary | null;
};
