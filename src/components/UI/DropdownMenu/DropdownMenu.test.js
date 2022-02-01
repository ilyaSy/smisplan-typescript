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
  beforeEach(() => {
    render(<DropdownMenu menuItems={dummyData} />);
  });

  test('Render items', async () => {
    expect(screen.getAllByRole('menuitem')[0].firstChild).toHaveTextContent('item');
    expect(screen.getByText('submenu')).toBeInTheDocument();
    expect(screen.getByRole('menu').children[2]).toHaveClass('ant-menu-item-divider');

    fireEvent.mouseOver(screen.getByRole('menu').children[2]);
    await waitFor(() => {
      screen.getByText('item')
    });
  });

  test('Triggering on click', async () => {
    fireEvent.click(screen.getByText('item'));
    await waitFor(() => {
      screen.getByText('item')
    });

    expect(dummyData[0].onClick).toHaveBeenCalled();
  });

  test('Render submenu', async () => {
    fireEvent.mouseOver(screen.getByText('submenu'));
    await waitFor(() => {
      screen.getByText('submenuItem1');
    })

    expect(screen.getByText('submenuItem1')).toBeInTheDocument();
    expect(screen.getByText('submenuItem2')).toBeInTheDocument();
  });
});
