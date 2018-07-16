const createBoardElement = (x, y, n, b = false) => ({
  width: x,
  height: y,
  code: n,
  isBlocker: b
});

const createBoard = (x, y, defaultFill='', boardElements={}) => {
  const cols = (new Array(y)).fill(defaultFill);
  const rows = (new Array(x)).fill(cols);
  
  const elements = Object.keys(boardElements);
  
  return elements.reduce((acc, el) => {
    const element = boardElements[el];
    const initial = el.split('x').map(p => parseInt(p, 10));
    const initialRow = initial[0];
    const initialColumn = initial[1];
    const finalRow = element.width + initialRow;
    const finalColumn = element.height + initialColumn;

    return acc.map((column, index) => {
      if (index >= initialRow && index < finalRow) {
        return column.map((pos, colIndex) => {
          if (colIndex >= initialColumn && colIndex < finalColumn) {
            return element.code;
          }
          return pos;
        });
      }
      return column;
    });
  }, rows);
};

/////////////////////////
/////////////////////////
//////// TESTING ////////
/////////////////////////
/////////////////////////

describe('createBoardElement function', () => {
  describe('when doesn\'t receive the last parameter', () => {
    test('returns a not blocker board element', () => {
      expect(createBoardElement(3, 3, 'x')).toEqual({
        width: 3,
        height: 3,
        code: 'x',
        isBlocker: false
      });
    });
  });
  
  test('returns a blocker board element', () => {
    expect(createBoardElement(2, 2, 'M', true)).toEqual({
      width: 2,
      height: 2,
      code: 'M',
      isBlocker: true
    });
  });

});

let board = {};
let resp = [];
const defaultEl = '';

describe('createBoard function', () => {
  describe('when there are not elements', () => {
    beforeEach(() => {
      resp = createBoard(5, 5);
    });

    test('returns a board with the right number of rows', () => {
      expect(resp).toHaveLength(5);
    });

    test('returns a board with the right number of columns', () => {
      expect(resp[0]).toHaveLength(5);
    });

    test('returns a board without elements', () => {
      expect(resp).toEqual([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ]);
    });
  });

  describe('when there is a small board with one element', () => {
    beforeEach(() => {
      board = {
        '2x0': createBoardElement(2, 2, 'M', true)
      };
      resp = createBoard(5, 5, defaultEl, board);
    });

    test('returns a board with the right number of rows', () => {
      expect(resp).toHaveLength(5);
    });

    test('returns a board with the right number of columns', () => {
      expect(resp[0]).toHaveLength(5);
    });

    test('returns a board with elements', () => {
      resp = createBoard(5, 5, defaultEl, board);
      expect(resp).toEqual([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['M', 'M', '', '', ''],
        ['M', 'M', '', '', ''],
        ['', '', '', '', '']
      ]);
    });
  });

  describe('when there is a huge board with many elements', () => {
    beforeEach(() => {
      board = {
        '2x0': createBoardElement(2, 2, 'M', true),
        '10x5': createBoardElement(5, 5, 'N', true),
        '6x15': createBoardElement(2, 8, 'F', true)
      };
      resp = createBoard(30, 30, defaultEl, board);
    });

    test('returns a board with the right number of rows', () => {
      expect(resp).toHaveLength(30);
    });

    test('returns a board with the right number of columns', () => {
      expect(resp[0]).toHaveLength(30);
    });

    test('returns the element "M" on the right position', () => {
      const element = 'M';

      expect(resp[1][0]).toEqual(defaultEl);
      expect(resp[1][1]).toEqual(defaultEl);

      expect(resp[2][0]).toEqual(element);
      expect(resp[2][1]).toEqual(element);

      expect(resp[3][0]).toEqual(element);
      expect(resp[3][1]).toEqual(element);

      expect(resp[4][0]).toEqual(defaultEl);
      expect(resp[4][1]).toEqual(defaultEl);
    });

    test('returns the element "N" on the right position', () => {
      const element = 'N';
      
      expect(resp[9][5]).toEqual(defaultEl);
      expect(resp[9][6]).toEqual(defaultEl);
      expect(resp[9][7]).toEqual(defaultEl);
      expect(resp[9][8]).toEqual(defaultEl);
      expect(resp[9][9]).toEqual(defaultEl);

      expect(resp[10][5]).toEqual(element);
      expect(resp[10][6]).toEqual(element);
      expect(resp[10][7]).toEqual(element);
      expect(resp[10][8]).toEqual(element);
      expect(resp[10][9]).toEqual(element);
      
      expect(resp[11][5]).toEqual(element);
      expect(resp[11][6]).toEqual(element);
      expect(resp[11][7]).toEqual(element);
      expect(resp[11][8]).toEqual(element);
      expect(resp[11][9]).toEqual(element);

      expect(resp[12][5]).toEqual(element);
      expect(resp[12][6]).toEqual(element);
      expect(resp[12][7]).toEqual(element);
      expect(resp[12][8]).toEqual(element);
      expect(resp[12][9]).toEqual(element);

      expect(resp[13][5]).toEqual(element);
      expect(resp[13][6]).toEqual(element);
      expect(resp[13][7]).toEqual(element);
      expect(resp[13][8]).toEqual(element);
      expect(resp[13][9]).toEqual(element);

      expect(resp[14][5]).toEqual(element);
      expect(resp[14][6]).toEqual(element);
      expect(resp[14][7]).toEqual(element);
      expect(resp[14][8]).toEqual(element);
      expect(resp[14][9]).toEqual(element);

      expect(resp[15][5]).toEqual(defaultEl);
      expect(resp[15][6]).toEqual(defaultEl);
      expect(resp[15][7]).toEqual(defaultEl);
      expect(resp[15][8]).toEqual(defaultEl);
      expect(resp[15][9]).toEqual(defaultEl);
    });

    test('returns the element "F" on the right position', () => {
      const element = 'F';
      
      expect(resp[5][15]).toEqual(defaultEl);
      expect(resp[5][16]).toEqual(defaultEl);
      expect(resp[5][17]).toEqual(defaultEl);
      expect(resp[5][18]).toEqual(defaultEl);
      expect(resp[5][19]).toEqual(defaultEl);
      expect(resp[5][20]).toEqual(defaultEl);
      expect(resp[5][21]).toEqual(defaultEl);
      expect(resp[5][22]).toEqual(defaultEl);

      expect(resp[6][15]).toEqual(element);
      expect(resp[6][16]).toEqual(element);
      expect(resp[6][17]).toEqual(element);
      expect(resp[6][18]).toEqual(element);
      expect(resp[6][19]).toEqual(element);
      expect(resp[6][20]).toEqual(element);
      expect(resp[6][21]).toEqual(element);
      expect(resp[6][22]).toEqual(element);

      expect(resp[7][15]).toEqual(element);
      expect(resp[7][16]).toEqual(element);
      expect(resp[7][17]).toEqual(element);
      expect(resp[7][18]).toEqual(element);
      expect(resp[7][19]).toEqual(element);
      expect(resp[7][20]).toEqual(element);
      expect(resp[7][21]).toEqual(element);
      expect(resp[7][22]).toEqual(element);

      expect(resp[8][15]).toEqual(defaultEl);
      expect(resp[8][16]).toEqual(defaultEl);
      expect(resp[8][17]).toEqual(defaultEl);
      expect(resp[8][18]).toEqual(defaultEl);
      expect(resp[8][19]).toEqual(defaultEl);
      expect(resp[8][20]).toEqual(defaultEl);
      expect(resp[8][21]).toEqual(defaultEl);
      expect(resp[8][22]).toEqual(defaultEl);
    });
  });
});