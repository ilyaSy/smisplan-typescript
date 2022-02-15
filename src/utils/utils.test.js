import {screen, act} from "@testing-library/react";
import Notification from "../components/UI/Notification";
import sortData from "./sortData";
import filterData from "./filterData";

describe('Utils tests', () => {
  test('sortData', () => {
    const array = [
      {key: 1},
      {key: 3},
      {key: 2},
    ];

    const array2 = [
      {key: 1},
      {key: 2},
      {key: 3},
    ];

    expect(array.sort(sortData('key'))).toEqual(array2);
  })

  test('filterData', () => {
    const dictionary = {
      dict: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
        key5: 'value5',
        key6: 'value6',
      }
    }

    expect(filterData('dict', dictionary)('key1', {dict: 'value1'})).toBe(true);
    expect(filterData('dict', dictionary)('key1', {dict: 'value0'})).toBe(false);
    expect(filterData('dictA', dictionary)('key1', {dictA: 'key1'})).toBe(true);
  })

  test('showNotification', () => {
    act(() => {
      Notification({
        description: 'description',
        type: 'info',
        message: 'message'
      });
    });

    expect(screen.getByText('message')).toBeInTheDocument();
  })
})
