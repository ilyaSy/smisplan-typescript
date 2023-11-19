import { notification } from 'antd';

import { INotification } from 'types';

const Notification = (action: INotification) => {
  const { type, message, description, duration = 5 } = action;

  notification[type]({
    message: message,
    description: description,
    placement: 'topRight',
    duration: duration,
  });
};

export default Notification;
