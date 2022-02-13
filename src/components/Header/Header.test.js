import { render, screen } from '@testing-library/react';
import { modes } from '../../constants/constants';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../../context/UserContext';
import Header from '.';

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserContextProvider>
          <Header />
        </UserContextProvider>
      </BrowserRouter>
    );
  });

  test('Displaying user login correctly', () => {
    expect(screen.getByText('Пушкин')).toBeInTheDocument();
  });

  test('Displaying modes correctly', () => {
    modes.forEach((mode) => {
      expect(screen.getByText(mode.value)).toBeInTheDocument();
      expect(screen.getByText(mode.value)).toHaveAttribute('href', `/${mode.id}`)
    });
  });
});
