import { configure, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StorageProvider } from '../../storages/storage';
import Sidebar from '.';

configure({
  testIdAttribute: 'id',
});

describe('Sidebar', () => {
  test('Displaying correctly', async () => {
    render(
      <BrowserRouter>
        <StorageProvider>
          <Sidebar />
        </StorageProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const sidebarElements = screen.getAllByRole('menuitem');
      expect(sidebarElements.length).toBe(3);
      expect(sidebarElements[0]).toHaveAttribute('data-menu-id', 'rc-menu-uuid-test-addData');
      expect(sidebarElements[1]).toHaveAttribute('data-menu-id', 'rc-menu-uuid-test-printPDF');
      expect(sidebarElements[2]).toHaveAttribute('data-menu-id', 'rc-menu-uuid-test-settings');
    });
  });

  test.skip('Show add modal menu', async () => {
    render(
      <BrowserRouter>
        <StorageProvider>
          <Sidebar />
        </StorageProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByRole('menuitem')[0]);
    await waitFor(() => {
      expect(screen.getByRole('document')).toHaveClass('ant-modal-wrap');
    });
  });

  test('Show settings submenu', async () => {
    render(
      <BrowserRouter>
        <StorageProvider>
          <Sidebar />
        </StorageProvider>
      </BrowserRouter>
    );

    fireEvent.mouseOver(screen.getAllByRole('menuitem')[2]);
    await waitFor(() => {
      expect(screen.getByText('Цветовая тема')).toBeInTheDocument();
      expect(screen.getByText('Инструкция')).toBeInTheDocument();
    });
  });
});
