module.exports = (test) => {
  test(
    `
        { 
            42;
            'Hello World';
        }
    `,
    {
      type: 'Program',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'NumericLiteral',
                value: 42,
              },
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'StringLiteral',
                value: 'Hello World',
              },
            },
          ],
        },
      ],
    }
  );
  test(
    `
        { 

        }
    `,
    {
      type: 'Program',
      body: [
        {
          type: 'BlockStatement',
          body: [],
        },
      ],
    }
  );
  test(
    `
        { 
            42;
            {
                "Nested Block";
            }
        }
    `,
    {
      type: 'Program',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'NumericLiteral',
                value: 42,
              },
            },
            {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'StringLiteral',
                    value: 'Nested Block',
                  },
                },
              ],
            },
          ],
        },
      ],
    }
  );
};
