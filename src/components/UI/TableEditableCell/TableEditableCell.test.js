import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableEditableRow from '../TableEditableRow';
import TableEditableCell from '.';

const options = {
  title: 'Test text',
  dataIndex: 'Test text',

  handleSave: jest.fn(),
  handleToggleEdit: jest.fn(),
};

describe('TableEditableCell: non-editable mode', () => {
  beforeEach(() => {
    render(<TableEditableRow>
      <TableEditableCell
        {...options}
        editable={false}
      >
        Test text
      </TableEditableCell>
    </TableEditableRow>);
  });

  test('Dispaying correctly', () => {
    expect(screen.getByRole('cell')).toBeInTheDocument();
  });
});

describe('TableEditableCell: editable mode', () => {
  test('Not editing: displaying correctly', () => {
    render(<TableEditableCell
      {...options}
      editable={true}
      editing={false}
    >
      Test text
    </TableEditableCell>);

    expect(screen.getByRole('cell').querySelector('div')).toHaveTextContent('Test text');
  });

  test('Not editing: click call switch to editing', async () => {
    render(<TableEditableCell
      {...options}
      editable={true}
      editing={false}
    >
      Test text
    </TableEditableCell>);

    fireEvent.click(screen.getByRole('cell').querySelector('div'));
    await waitFor(() => {
      expect(options.handleToggleEdit).toBeCalled();
    });
  });

  test('Editing: displaying correctly', async () => {
    render(<TableEditableCell
      {...options}
      editable={true}
      editing={true}
    >
      Test text
    </TableEditableCell>);

    expect(screen.getByRole('cell').querySelector('.ant-input')).not.toBe(null);
  });

  test('Editing: blur input call submit', async () => {
    render(<TableEditableCell
      {...options}
      editable={true}
      editing={true}
    >
      Test text
    </TableEditableCell>);

    fireEvent.blur(screen.getByRole('cell').querySelector('.ant-input'));
    await waitFor(() => {
      expect(options.handleSave).toBeCalled();
    });
  });
});
