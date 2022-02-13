import { render, screen, waitFor } from '@testing-library/react';
import { modes } from '../../constants/constants';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../context/UserContext';
import Header from '.';

describe('Header', () => {
  test('Displaying user login correctly', async () => {
    render(
      <BrowserRouter>
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Пушкин')).toBeInTheDocument();
    });
  });

  test('Displaying modes correctly', async () => {
    render(
      <BrowserRouter>
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      modes.forEach((mode) => {
        expect(screen.getByText(mode.value)).toBeInTheDocument();
        expect(screen.getByText(mode.value)).toHaveAttribute('href', `/${mode.id}`)
      });
    });
  });
});
