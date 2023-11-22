import { ICommonModalProps } from 'interfaces';
import { createObserver } from '.';
import { useUpdateStateViaObserver } from 'hooks';

interface IModal extends ICommonModalProps {
  [k: string]: any;
}

interface IOptions {
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}

export const connectModalControls = <T extends IModal>(Modal: React.FC<T>, options: IOptions = {}) => {
  const { onOpen, onClose } = options;

  const observer = createObserver();

  const open = () => {
    onOpen && onOpen();

    observer.notify(true);
  };

  const close = () => {
    onClose && onClose();

    observer.notify(false);
  };

  const Component: React.FC<T> = ({ ...props }) => {
    const isOpen = useUpdateStateViaObserver(observer);

    return <Modal
      {...props}
      isOpen={isOpen}
      close={() => observer.notify(false)}
    />;
  };

  return { Modal: Component as React.FC<Omit<T, 'isOpen' | 'close'>>, open, close };
};
