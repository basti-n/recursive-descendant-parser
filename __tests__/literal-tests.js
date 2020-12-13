module.exports = (test) => {
  // Numeric Literial
  test('42;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 42,
        },
      },
    ],
  });

  // String Literial
  test(`'Hello World';`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'Hello World',
        },
      },
    ],
  });

  // String Literial
  test(`"Hello World";`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'Hello World',
        },
      },
    ],
  });
};
