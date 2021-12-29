import React from "react";
import {render, screen} from "@testing-library/react";
import SuspenseFallback from "./index";

describe('SuspenseFallback', () => {
  test('Loading', () => {
    const { container } = render(<SuspenseFallback type="loading"/>);

    expect(container.firstChild).toHaveClass('loading-component');
  })

  test('Text node', () => {
    render(<SuspenseFallback type="textNode"/>);
    expect(screen.getByText('...')).toBeInTheDocument();
  })
})