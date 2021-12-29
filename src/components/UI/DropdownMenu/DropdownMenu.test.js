import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import DropdownMenu from "./index";

const dummyData = [
  {
    type: 'item',
    title: 'item',
    key: 'item',
    onClick: jest.fn(),
  },
  {
    type: 'submenu',
    title: 'submenu',
    key: 'submenu',
    items: [
      {
        title: 'submenuItem1',
        key: 'submenuItem1',
        onClick: jest.fn(),
      },
      {
        title: 'submenuItem2',
        key: 'submenuItem2',
        onClick: jest.fn(),
      }
    ]
  },
  {
    type: 'divider',
    key: 'divider'
  }
];

describe('DropdownMenu', () => {
  test('render test dropdown menu', async () => {
    const { getByText } = render(<DropdownMenu menuItems={dummyData} />);

    fireEvent.mouseOver(getByText('submenu'));

    await waitFor(() => {
      getByText('submenuItem1');
    })

    expect(screen.getAllByRole('menuitem')[0].firstChild).toHaveTextContent('item');
    expect(screen.getByText('submenuItem1')).toBeInTheDocument();
    expect(screen.getByText('submenuItem2')).toBeInTheDocument();
    expect(screen.getByRole('menu').children[2]).toHaveClass('ant-menu-item-divider');
  });
});