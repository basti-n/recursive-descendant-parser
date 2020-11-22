module.exports = (test) => {
  // String Literial
  test(
    `
  'Hello World';
    42;
  `,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'StringLiteral',
            value: 'Hello World',
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NumericLiteral',
            value: 42,
          },
        },
      ],
    }
  );
};
