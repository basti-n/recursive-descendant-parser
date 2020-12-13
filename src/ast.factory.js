class DefaultASTFactory {
  static Program(body) {
    return { type: 'Program', body };
  }

  static EmptyStatement() {
    return {
      type: 'EmptyStatement',
    };
  }

  static BlockStatement(body) {
    return {
      type: 'BlockStatement',
      body,
    };
  }

  static ExpressionStatement(expression) {
    return {
      type: 'ExpressionStatement',
      expression,
    };
  }

  static BinaryExpression(operator, left, right) {
    return { type: 'BinaryExpression', operator, left, right };
  }

  static StringLiteral(token) {
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1),
    };
  }

  static NumericLiteral(token) {
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    };
  }
}

module.exports = DefaultASTFactory;
