import {screen, render, configure} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import { useFilterDrawer } from '.';

configure({
  testIdAttribute: 'id',
});

const columns = [
  {
    dataIndex: 'field1',
    title: 'field1',
    showInTable: true,
    isFilter: true,
    type: 'string',
  },
  {
    dataIndex: 'field2',
    title: 'field2',
    showInTable: false,
    isFilter: true,
    type: 'number',
  },
  // {
  //   dataIndex: 'field3',
  //   title: 'field3',
  //   showInTable: false,
  //   isFilter: true,
  //   type: 'select',
  // },
  // {
  //   dataIndex: 'field4',
  //   title: 'field4',
  //   showInTable: false,
  //   isFilter: true,
  //   type: 'multi-select',
  // },
  {
    dataIndex: 'field5',
    title: 'field5',
    showInTable: false,
    isFilter: true,
    type: 'date',
  },
  {
    dataIndex: 'field6',
    title: 'field6',
    showInTable: false,
    isFilter: true,
    type: 'time',
  },
  {
    dataIndex: 'field8',
    title: 'field8',
    showInTable: false,
    isFilter: true,
    type: 'checkbox',
  }
]

describe('Filter panel', () => {
  it('Displaying correctly', () => {
    const { result } = renderHook(() => useFilterDrawer(columns, [], true))

    render(result.current.FilterPanel);

    columns.forEach((column) => {
      let attrValue = column.type;
      let attrName = 'type';
      if (['string', 'number'].includes(column.type)) attrValue = 'text';
      if (['select', 'multi-select'].includes(column.type)) attrValue = 'search';
      if (['date', 'time'].includes(column.type)) {
        attrName = 'placeholder';
        attrValue = column.type === 'date' ? 'Select date' : 'Select time';
      }

      expect(screen.getByTestId(`basic_${column.dataIndex}`)).toHaveAttribute(attrName, attrValue)
    });
  });
});
