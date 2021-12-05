import { createContext } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

export const EditableContext = createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  id: number;
}

const DataTableEditableRow: React.FC<EditableRowProps> = ({ id, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default DataTableEditableRow;