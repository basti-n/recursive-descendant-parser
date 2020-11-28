const { Tokenizer } = require('./tokenizer');

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
    return { type: 'Program', body: this.StatementList() };
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

    return {
      type: 'EmptyStatement',
    };
  }

  /**
   * BlockStatement
   *  : '{' OptStatementList '}'
   */
  BlockStatement() {
    this._eat('{');

    const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

    this._eat('}');

    return {
      type: 'BlockStatement',
      body,
    };
  }

  /**
   * ExpressionStatement
   *  : Expression ;
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this._eat(';');
    return {
      type: 'ExpressionStatement',
      expression,
    };
  }

  /**
   * Expression
   */
  Expression() {
    return this.Literal();
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
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1),
    };
  }

  /**
   * NumericLiteral
   *    :Number
   */
  NumericLiteral() {
    const token = this._eat('NUMBER');
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    };
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
