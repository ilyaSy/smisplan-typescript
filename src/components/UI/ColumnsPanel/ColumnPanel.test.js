import { screen, render, configure, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useColumnsDrawer } from '.';

configure({
  testIdAttribute: 'id',
});

const columns = [
  {
    dataIndex: 'field1',
    title: 'field1',
    showInTable: true,
    type: '',
  },
  {
    dataIndex: 'field2',
    title: 'field2',
    showInTable: false,
    type: '',
  }
]

describe('Select column panel', () => {
  it('Displaying correct', async () => {
    const { result } = renderHook(() => useColumnsDrawer(columns, true));

    render( result.current.ColumnsPanel );
    render( result.current.ColumnsPanelButtons );

    columns.forEach((column) => {
      expect(screen.getByTestId(`basic_${column.dataIndex}`)).toBeInTheDocument();
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });
  });

  it('Displaying initial values correct', () => {
    const { result } = renderHook(() => useColumnsDrawer(columns, true));

    render( result.current.ColumnsPanel );

    expect(screen.getByTestId(`basic_${columns[0].dataIndex}`)).toBeChecked();
    expect(screen.getByTestId(`basic_${columns[1].dataIndex}`)).not.toBeChecked();
  });

  it('Reseting default values', async () => {
    const { result } = renderHook(() => useColumnsDrawer(columns, true));

    render( result.current.ColumnsPanel );

    columns.forEach((column) => {
      fireEvent.click(screen.getByTestId(`basic_${column.dataIndex}`));
    })

    act(() => {
      fireEvent.click(screen.getByText('По умолчанию').closest('button'));
    });

    await waitFor(() => {
      screen.getByTestId(`basic_${columns[0].dataIndex}`);
    });

    expect(screen.getByTestId(`basic_${columns[0].dataIndex}`)).toBeChecked();
    expect(screen.getByTestId(`basic_${columns[1].dataIndex}`)).not.toBeChecked();
  });

  it('Changing displayed columns', async () => {
    const { result, waitForValueToChange } = renderHook(() => useColumnsDrawer(columns, true));

    render( result.current.ColumnsPanel );

    columns.forEach((column) => {
      fireEvent.click(screen.getByTestId(`basic_${column.dataIndex}`));
    })

    act(() => {
      fireEvent.click(screen.getByText('Применить').closest('button'));
    });

    await waitForValueToChange(() => result.current.columnsData);

    expect(result.current.columnsData.length).toBe(1);
    expect(result.current.columnsData[0]).toEqual({
      ...columns[1],
      showInTable: true,
    });
  });
});
