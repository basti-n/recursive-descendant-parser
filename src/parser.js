/**
 * Implementation: Letter Parser - Recursive Descent Parser
 */

class Parser {
  /** Parses String into AST */
  parse(string) {
    this._string = string;

    /** Parse recursively starting
     * from the main entry point
     */
    return this.Program();
  }

  /**
   * Main Entry Point
   *
   * Programm
   *    : NumericLiteral
   */
  Program() {
    return { type: "Program", body: this.NumericLiteral() };
  }

  /**
   * NumericLiteral
   *    :Number
   */
  NumericLiteral() {
    return {
      type: "NumericLiteral",
      value: Number(this._string),
    };
  }
}

module.exports = { Parser };
