import { fireEvent, render, screen, waitFor, configure } from "@testing-library/react";
import { DictionaryContextProvider } from "../../../context/DictionaryContext";
import ModalWithForm from './index';

configure({
  testIdAttribute: 'id',
});

const dummyData = {
  okButtonTitle: 'AddSomething',
  isOpen: true,
  handleOk: jest.fn(),
  handleClose: jest.fn(),
  formItems: [{
      disabled: false,
      label: 'string',
      type: 'string',
      name: 'string',
    },
    {
      disabled: true,
      label: 'disabled',
      type: 'string',
      name: 'disabled',
    },
    {
      disabled: false,
      label: 'number',
      type: 'number',
      name: 'number',
    },
    {
      disabled: false,
      label: 'date',
      type: 'date',
      name: 'date',
    },
    {
      disabled: false,
      label: 'time',
      type: 'time',
      name: 'time',
    },
    // {
    //   disabled: false,
    //   label: 'select',
    //   type: 'select',
    //   name: 'select',
    // },
    // {
    //   disabled: false,
    //   label: 'multi-select',
    //   type: 'multi-select',
    //   name: 'multi-select',
    // },
    {
      disabled: false,
      label: 'fulltext',
      type: 'fulltext',
      name: 'fulltext',
    },
  ],
  additionalButtons: [],
  initialValues: [],
}

describe('ModalWithForm', () => {
  test('Click submit button', async () => {
    render(
      <DictionaryContextProvider>
        <ModalWithForm {...dummyData} />
      </DictionaryContextProvider>
    );

    fireEvent.click(screen.getByText(dummyData.okButtonTitle).closest('button'))
    await screen.findByText(dummyData.okButtonTitle);

    expect(dummyData.handleOk).toBeCalled();
  });

  test('Click close button', async () => {
    render(<ModalWithForm {...dummyData} />);

    fireEvent.click(screen.getByLabelText('Close'))
      await waitFor(() => {
        screen.getByLabelText('Close');
      });

    expect(dummyData.handleClose).toBeCalled();
  });

  test('Click cancel button', async () => {
    render(<ModalWithForm {...dummyData} />);

    fireEvent.click(screen.getByText('Отмена').closest('button'))
    await waitFor(() => {
      screen.getByText('Отмена');
    });

    expect(dummyData.handleClose).toBeCalled();
  });

  test('String input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_string')).toBeInTheDocument();
  });

  test('Disabled string input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_disabled')).toHaveAttribute('disabled', '');
  });

  test('Number input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_number')).toBeInTheDocument();
  });

  test('Date input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_date')).toBeInTheDocument();
  });

  test('Time input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_time')).toBeInTheDocument();
  });

  test('Fulltext input', async () => {
    render(<ModalWithForm {...dummyData} />);

    expect(screen.getByTestId('basic_fulltext').closest('div').querySelector('textarea')).toBeInTheDocument();
  });
})
