import { configure, fireEvent, render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useModalWithSelect } from '.';

configure({
  testIdAttribute: 'id',
});

const options = {
  title: 'title',
  list: [
    {
      optionTitle: 'option1',
      optionValue: 'option1'
    },
    {
      optionTitle: 'option2',
      optionValue: 'option2'
    }
  ],
  onSubmit: jest.fn(),
}

describe('Modal With Select', () => {
  let result;
  let waitForValueToChange = () => {};
  beforeEach(() => {
    const hook = renderHook(() => useModalWithSelect(options.title, options.list, options.onSubmit));
    result = hook.result;
    waitForValueToChange = hook.waitForValueToChange;
    result.current.toggleOpen(true);
    render( result.current.ModalPrintSelect );
  });

  test('Displaying correctly', () => {
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('Click OK', async () => {
    const radio = screen.getByDisplayValue('option2');
    const button = screen.getByText('OK').closest('button');

    act(() => {
      // fireEvent.change(radio, { target: { value: 'option2' } })
      fireEvent.click(radio);

      button.disabled = false;
      fireEvent.click(button);
    });

    await waitForValueToChange(() => result.current.value);

    expect(options.onSubmit).toHaveBeenCalledWith('option2');
    // expect(options.onSubmit).toHaveBeenCalled();
  })
});
