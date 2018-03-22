const createBoardElement = (x, y, n, b = false) => ({
  width: x,
  height: y,
  code: n,
  isBlocker: b
});

const board = {
  '2x0': createBoardElement(2, 2, 'M', true)
};

const createBoard = (x, y, defaultFill='', boardElements={}) => {
  const col = (new Array(y)).fill(defaultFill);
  const rows = (new Array(x)).fill(col);
  
  const elements = Object.keys(boardElements);
  const hasElements = elements.length > 0;
  
  if (hasElements) {
    elements.forEach((el) => {
      const element = boardElements[el];
      const initial = el.split('x').map(p => parseInt(p, 10));
      
      let i = initial[0];
      let j = initial[1];
      
      for (i; i < (element.width); i++) {
        for (j; j < (element.height); j++) {
          console.log('oba')
          rows[i][j] = element.code;
        }  
      }
    });
  }
  
  return rows;
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

describe('createBoard function', () => {

  test('returns a board without elements', () => {
    expect(createBoard(5, 5)).toEqual([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
  });

  test('returns a board with elements', () => {
    expect(createBoard(5, 5, '', createBoardElement(2, 2, 'M', true))).toEqual([
      ['M', 'M', '', '', ''],
      ['M', 'M', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
  });

});