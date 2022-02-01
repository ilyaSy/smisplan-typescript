import {screen, render, configure, fireEvent} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import { useFilterDrawer } from '.';
import { updateInputSubmit } from '../../../tests/testUtils';

configure({
  testIdAttribute: 'id',
});

const columns = [
  {
    dataIndex: 'string',
    title: 'string',
    showInTable: true,
    isFilter: true,
    type: 'string',
  },
  {
    dataIndex: 'number',
    title: 'number',
    showInTable: false,
    isFilter: true,
    type: 'number',
  },
  // {
  //   dataIndex: 'select',
  //   title: 'select',
  //   showInTable: false,
  //   isFilter: true,
  //   type: 'select',
  // },
  // {
  //   dataIndex: 'multi-select',
  //   title: 'multi-select',
  //   showInTable: false,
  //   isFilter: true,
  //   type: 'multi-select',
  // },
  {
    dataIndex: 'date',
    title: 'date',
    showInTable: false,
    isFilter: true,
    type: 'date',
  },
  {
    dataIndex: 'time',
    title: 'time',
    showInTable: false,
    isFilter: true,
    type: 'time',
  },
  {
    dataIndex: 'checkbox',
    title: 'checkbox',
    showInTable: false,
    isFilter: true,
    type: 'checkbox',
  },
  {
    dataIndex: 'fulltext',
    title: 'fulltext',
    showInTable: false,
    isFilter: true,
    type: 'fulltext',
  }
]

const sourceData = [
  {
    string: 'string',
    number: 14,
    checkbox: false,
    fulltext: 'fulltext',
    date: '2022-02-01',
    time: '10:00:00',
  },
]

describe('Filter panel', () => {
  let result;
  let submitButton;
  let waitForValueToChange = () => {};
  beforeEach(() => {
    const hook = renderHook(() => useFilterDrawer(columns, sourceData, true))
    result = hook.result;
    waitForValueToChange = hook.waitForValueToChange;

    render(result.current.FilterPanel);

    submitButton = screen.getByText('Применить').closest('button')
  });

  it('Displaying correctly', () => {
    // columns.forEach((column) => {
    //   let attrValue = column.type;
    //   let attrName = 'type';
    //   if (['string', 'number'].includes(column.type)) attrValue = 'text';
    //   if (['select', 'multi-select'].includes(column.type)) attrValue = 'search';
    //   if (['date', 'time'].includes(column.type)) {
    //     attrName = 'placeholder';
    //     attrValue = column.type === 'date' ? 'Select date' : 'Select time';
    //   }

    //   expect(screen.getByTestId(`basic_${column.dataIndex}`)).toHaveAttribute(attrName, attrValue)
    // });
  });

  test('String filter', () => {
    expect(screen.getByTestId('basic_string')).toBeInTheDocument();
    expect(screen.getByTestId('basic_string')).toHaveAttribute('type', 'text');
  });

  test('Number filter', () => {
    expect(screen.getByTestId('basic_number')).toBeInTheDocument();
    expect(screen.getByTestId('basic_number')).toHaveAttribute('type', 'text');
  });

  test('Date filter', () => {
    expect(screen.getByTestId('basic_date')).toBeInTheDocument();
    expect(screen.getByTestId('basic_date')).toHaveAttribute('placeholder', 'Select date');
  });

  test('Time filter', () => {
    expect(screen.getByTestId('basic_time')).toBeInTheDocument();
    expect(screen.getByTestId('basic_time')).toHaveAttribute('placeholder', 'Select time');
  });

  test('Fulltext filter', () => {
    expect(screen.getByTestId('basic_fulltext').closest('div').querySelector('textarea')).toBeInTheDocument();
  });

  test('Checkbox filter', () => {
    expect(screen.getByTestId('basic_checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('basic_checkbox')).toHaveAttribute('type', 'checkbox');
  });

  test('Filter data by string', async () => {
    const input = screen.getByTestId('basic_string');

    updateInputSubmit(input, 'string', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(1);

    updateInputSubmit(input, 'no-string', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(0);
  })

  test('Filter data by number', async () => {
    const input = screen.getByTestId('basic_number');

    updateInputSubmit(input, '14', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(1);

    updateInputSubmit(input, '10', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(0);
  });

  test('Filter data by fulltext', async () => {
    const input = screen.getByTestId('basic_fulltext');

    updateInputSubmit(input, 'fulltext', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(1);

    updateInputSubmit(input, 'no-fulltext', submitButton);
    await waitForValueToChange(() => result.current.filterData);
    expect(result.current.filterData.length).toBe(0);
  })

  test('Filter data by checkbox', async () => {
    const checkbox = screen.getByTestId('basic_checkbox');

    act(() => {
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);
    });

    await waitForValueToChange(() => result.current.filterData);

    expect(screen.getByTestId('basic_checkbox').checked).toBe(true);
    expect(result.current.filterData.length).toBe(0);
  })
});
