import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StorageProvider } from '../../../storages/storage';
import { DictionaryContextProvider } from '../../../context/DictionaryContext';
import { UserContextProvider } from '../../../context/UserContext';
import { PrintPDFContextProvider } from '../../../context/PrintPDFContext';
import DataTable from '.';

const columns = [
  {
    dataIndex: 'string',
    title: 'string',
    showInTable: true,
    isFilter: true,
    type: 'string',
    isInlineEditable: false,
  },
  {
    dataIndex: 'number',
    title: 'number',
    showInTable: false,
    isFilter: true,
    type: 'number',
    isInlineEditable: false,
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
    isInlineEditable: false,
  },
  {
    dataIndex: 'time',
    title: 'time',
    showInTable: false,
    isFilter: true,
    type: 'time',
    isInlineEditable: false,
  },
  {
    dataIndex: 'checkbox',
    title: 'checkbox',
    showInTable: false,
    isFilter: true,
    type: 'checkbox',
    isInlineEditable: false,
  },
  {
    dataIndex: 'fulltext',
    title: 'fulltext',
    showInTable: false,
    isFilter: true,
    type: 'fulltext',
    isInlineEditable: false,
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
  hasActionMenu: true,
  hasEditMenu: true,
  hasDeleteButton: true,
  hasSetStatusMenu: true,
  hasGoToDiscussion: true,
  hasDiscussion: true
};

describe('Table', () => {
  test('Displaying correctly', async () => {
    render(
      <BrowserRouter>
        <UserContextProvider>
          <DictionaryContextProvider>
            <StorageProvider>
              <PrintPDFContextProvider>
                <DataTable
                  columns={columns}
                  data={sourceData}
                  tableParameters={tableParameters}
                />
              </PrintPDFContextProvider>
            </StorageProvider>
          </DictionaryContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      screen.debug();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
