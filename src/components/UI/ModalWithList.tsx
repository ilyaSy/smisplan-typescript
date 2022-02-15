import { List, Modal } from "antd";

interface IModalWithList {
  title: string;
  dataSource?: {title: string, description: string}[],
  noDataText?: string,
  avatar?: React.ReactNode,
  width?: number,
};

const ModalWithList = ({
  title,
  dataSource = [],
  noDataText = 'Нет данных',
  avatar,
  width = 600,
}: IModalWithList) => {
  if (dataSource && dataSource.length) {
    Modal.info({
      title,
      content: (
        <List
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={avatar}
                // avatar={<CarryOutOutlined />}
                title={item.title}
                description={item.description.split('\n').map((text) => <div>{text}</div>)}
              />
            </List.Item>
          )}
        />
      ),
      width: `${width}px`
    });
  } else {
    Modal.info({
      title,
      content: noDataText,
      width: `${width}px`
    });
  }

}

export default ModalWithList;
