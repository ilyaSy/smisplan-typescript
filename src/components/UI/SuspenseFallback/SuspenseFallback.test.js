import React from "react";
import {render} from "@testing-library/react";
import renderer from 'react-test-renderer';
import SuspenseFallback from "./index";

describe('SuspenseFallback', () => {
  test('Loading', () => {
    const { container } = render(<SuspenseFallback type="loading"/>);

    // expect(container.firstChild.classList.contains('ant-spin ant-spin-spinning loading-component')).toBe(true);
    // expect(screen.getBy('svg')).toBe(true);
    expect(container.firstChild?.classList.contains('loading-component')).toBe(true);
    // expect(screen.getByRole('svg')).toMatchInlineSnapshot(renderer.create(<LoadingComponent />));
  })

  test('Text node', () => {
    const suspenseCallback = renderer.create(<SuspenseFallback type="textNode"/>).toJSON();
    expect(suspenseCallback).toMatchInlineSnapshot(`
<p>
  ...
</p>
`);
  })
})