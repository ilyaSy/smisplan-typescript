import React from 'react';
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

const selectedOption = 'option2';

const mockUpdateStateValue = jest.fn();
const originalUseState = (initialState) => jest.requireActual('react').useState(initialState);
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => typeof initialState === 'boolean'
    ? jest.requireActual('react').useState(initialState)
    : [initialState, mockUpdateStateValue],
}))

describe('Modal With Select', () => {
  let result;
  beforeEach(() => {
    const hook = renderHook(() => useModalWithSelect(options.title, options.list, options.onSubmit));
    result = hook.result;
    act(() => {
      result.current.toggleOpen(true);
      render( result.current.ModalPrintSelect );
    });
  });

  test('Displaying correctly', async () => {
    act(() => {
      result.current.toggleOpen(true);
      render( result.current.ModalPrintSelect );

      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getAllByDisplayValue(/option\d/).length).toBe(2);
    });
  });

  test('Click RADIO causes value to change', async () => {
    act(() => {
      result.current.toggleOpen(true);
      render( result.current.ModalPrintSelect );

      const radio = screen.getByDisplayValue(selectedOption);

      fireEvent.click(radio);

      expect(mockUpdateStateValue).toHaveBeenCalledWith(selectedOption);
    });

    React.useState = originalUseState;
  })

  test('Click OK', async () => {
    act(() => {
      result.current.toggleOpen(true);
      render( result.current.ModalPrintSelect );

      const radio = screen.getByDisplayValue(selectedOption);
      const button = screen.getByText('OK').closest('button');

      fireEvent.click(radio);

      button.disabled = false;
      fireEvent.click(button);
    });

    expect(result.current.value).toBe(selectedOption);
    // expect(options.onSubmit).toHaveBeenCalledWith(selectedOption);
  })
});
