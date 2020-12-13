const { Tokenizer } = require('./tokenizer');
const DefaultASTFactory = require('./ast.factory');

/**
 * Implementation: Letter Parser - Recursive Descent Parser
 */

class Parser {
  constructor() {
    this._string = '';
    this._tokenizer = new Tokenizer();
  }

  /** Parses String into AST */
  parse(string) {
    this._string = string;
    this._tokenizer.init(string);

    /**
     * Prime the tokenizer to obtain the first
     * token which corresponds to our lookahead.
     * Lookahead is used for predictive parsing
     */
    this._lookahead = this._tokenizer.getNextToken();

    /** Parse recursively starting
     * from the main entry point
     */
    return this.Program();
  }

  /**
   * Main Entry Point
   *
   * Programm
   *    : StatementList
   */
  Program() {
    return DefaultASTFactory.Program(this.StatementList());
  }

  /**
   * Statement List
   *  : Statement
   *  | StatementList Statement
   */
  StatementList(stopLookAhead = null) {
    const statementList = [this.Statement()];

    while (this._lookahead != null && this._lookahead.type !== stopLookAhead) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  /**
   * Statement
   *  | ExpressionStatement
   *  : BlockStatement
   *  ; EmptyStatement
   */
  Statement() {
    switch (this._lookahead.type) {
      case ';':
        return this.EmptyStatement();

      case '{':
        return this.BlockStatement();

      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * EmptyStatement
   *  : ';'
   */
  EmptyStatement() {
    this._eat(';');

    return DefaultASTFactory.EmptyStatement();
  }

  /**
   * BlockStatement
   *  : '{' OptStatementList '}'
   */
  BlockStatement() {
    this._eat('{');

    const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

    this._eat('}');

    return DefaultASTFactory.BlockStatement(body);
  }

  /**
   * ExpressionStatement
   *  : Expression ;
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this._eat(';');
    return DefaultASTFactory.ExpressionStatement(expression);
  }

  /**
   * Expression
   */
  Expression() {
    return this.AdditiveExpression();
  }

  /**
   * AdditiveExpression
   *  :Literal
   *  |AdditiveLiteral ADDITIVE_OPERATOR Literal
   */
  AdditiveExpression() {
    return this._GenericBinaryExpression(
      'MultiplicativeExpression',
      'ADDITIVE_OPERATOR'
    );
  }

  /**
   * MultiplicateExpression
   *  :PrimaryExpression
   */
  MultiplicativeExpression() {
    return this._GenericBinaryExpression(
      'PrimaryExpression',
      'MULTIPLICATIVE_OPERATOR'
    );
  }

  _GenericBinaryExpression(buildCommand, operatorType) {
    let left = this[buildCommand]();

    while (this._lookahead.type === operatorType) {
      // operator *, /, +, -
      const operator = this._eat(operatorType).value;

      const right = this[buildCommand]();

      left = DefaultASTFactory.BinaryExpression(operator, left, right);
    }

    return left;
  }

  /**
   * PrimaryExpression
   *  | Literal
   */
  PrimaryExpression() {
    switch (this._lookahead.type) {
      case '(':
        return this.ParenthesizedExpression();
      default:
        return this.Literal();
    }
  }

  /**
   * Parenthesized Expression
   *  | '(' Expression ')'
   */
  ParenthesizedExpression() {
    this._eat('(');
    const expression = this.Expression();
    this._eat(')');

    return expression;
  }

  /**
   * Literal
   *  | StringLiteral
   *  : Numberliteral
   */
  Literal() {
    switch (this._lookahead.type) {
      case 'NUMBER':
        return this.NumericLiteral();
      case 'STRING':
        return this.StringLiteral();
    }

    throw new SyntaxError(
      `Literal: Unexpected Literal Type ${this._lookahead.type}`
    );
  }

  /**
   * StringLiteral
   *  :String
   */
  StringLiteral() {
    const token = this._eat('STRING');
    return DefaultASTFactory.StringLiteral(token);
  }

  /**
   * NumericLiteral
   *    :Number
   */
  NumericLiteral() {
    const token = this._eat('NUMBER');
    return DefaultASTFactory.NumericLiteral(token);
  }

  /**
   * Expects a token of a given type
   */
  _eat(tokenType) {
    const token = this._lookahead;

    if (token == null) {
      throw new SyntaxError(
        `Unexpected end of input, expected: "${tokenType}"`
      );
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.type}",  expected: "${tokenType}"`
      );
    }

    // Advance lookahead to next token
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}

module.exports = { Parser };
