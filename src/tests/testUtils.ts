import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

type TUpdateInputSubmit = (
  input: HTMLElement,
  value: string | number,
  submitButton?: HTMLElement,
) => void;

export const updateInputSubmit: TUpdateInputSubmit = (input, value, submitButton) => {
  act(() => {
    fireEvent.change(input, {target: { value }});

    if (submitButton) fireEvent.click(submitButton);
  });
};
