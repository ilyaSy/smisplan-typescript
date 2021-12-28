import sortData from "./sortData";

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
})