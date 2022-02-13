import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StorageProvider } from '../../../storages/storage';
import { DictionaryContextProvider } from '../../../context/DictionaryContext';
import { UserContextProvider } from '../../../context/UserContext';
import { PrintPDFContextProvider } from '../../../context/PrintPDFContext';
import Table from '.';

const columns = [
  {
    dataIndex: 'string',
    id: 'string',
    key: 'string',
    type: 'string',
    title: 'string',
    defaultValue: '',
    showInTable: true,
    isFilter: true,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 1,
    validValues: '',
  },
  {
    dataIndex: 'number',
    id: 'number',
    key: 'number',
    type: 'number',
    title: 'number',
    defaultValue: '',
    showInTable: false,
    isFilter: true,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 2,
    validValues: '',
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
    id: 'date',
    key: 'date',
    type: 'date',
    title: 'date',
    defaultValue: '',
    showInTable: true,
    isFilter: true,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 3,
    validValues: '',
  },
  {
    dataIndex: 'time',
    id: 'time',
    key: 'time',
    type: 'time',
    title: 'time',
    defaultValue: '',
    showInTable: true,
    isFilter: false,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 4,
    validValues: '',
  },
  {
    dataIndex: 'checkbox',
    id: 'checkbox',
    key: 'checkbox',
    type: 'checkbox',
    title: 'checkbox',
    defaultValue: '',
    showInTable: true,
    isFilter: true,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 5,
    validValues: '',
  },
  {
    dataIndex: 'fulltext',
    id: 'fulltext',
    key: 'fulltext',
    type: 'fulltext',
    title: 'fulltext',
    defaultValue: '',
    showInTable: true,
    isFilter: true,
    hasFullTextLink: false,
    isInlineEditable: false,
    isEditable: true,
    sorter: jest.fn(),
    tableIndex: 6,
    validValues: '',
  }
]

const sourceData = [
  {
    string: 'string1',
    number: 1,
    checkbox: false,
    fulltext: 'fulltext1',
    date: '2022-02-01',
    time: '10:00:00',
  },
  {
    string: 'string2',
    number: 2,
    checkbox: true,
    fulltext: 'fulltext2',
    date: '2022-02-02',
    time: '11:00:00',
  },
  {
    string: 'string4',
    number: 3,
    checkbox: false,
    fulltext: 'fulltext3',
    date: '2022-02-03',
    time: '16:00:00',
  },
];

const tableParameters = {
  id: "specificParameters",
  mainValue: "string",
  tableName: "Задачи",
  defaultSortField: "string",
  defaultSortDirection: "descend",
  addMenuTitle: "Новая задача",
  hasTitleRow: false,
  hasAddMenu: true,
  hasSublistData: false,
  hasActionMenu: false,
  hasEditMenu: true,
  hasDeleteButton: true,
  hasSetStatusMenu: true,
  hasGoToDiscussion: false,
  hasDiscussion: true
};

describe('Table', () => {
  test('Displaying correctly', async () => {
    render(
      <BrowserRouter>
        {/* <UserContextProvider> */}
          {/* <DictionaryContextProvider> */}
            <StorageProvider>
              <PrintPDFContextProvider>
                <Table
                  columns={columns}
                  data={sourceData}
                  tableParameters={tableParameters}
                />
              </PrintPDFContextProvider>
            </StorageProvider>
          {/* </DictionaryContextProvider> */}
        {/* </UserContextProvider> */}
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      screen.debug();
    });
  });
});
