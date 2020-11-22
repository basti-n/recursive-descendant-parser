/**
 * Tokenizer Specs
 */
const specs = [
  // Whitespace
  [null, /^\s+/],

  // Single Line Comment
  [null, /^\/\/.*/],

  // Skip Multi-Line Comment
  [null, /^\/\*[\s\S]*?\*\//],

  // Symbols & Delimiters
  [';', /^;/],

  ['NUMBER', /^\d+/],
  ['STRING', /^"[^"]*"/],
  ['STRING', /^'[^']*'/],
];

/**
 * Tokenizer Class
 * Lazily pulls a token from a stream
 */
class Tokenizer {
  /** Initializes the token */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Returns whether Tokenizer reached
   * end of file.
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /** Returns true if next token exists, otherwise false */
  hasNextToken() {
    return this._cursor < this._string.length;
  }

  /** Obtains next token */
  getNextToken() {
    if (!this.hasNextToken()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [tokenType, regExp] of specs) {
      const tokenValue = this._match(regExp, string);

      if (tokenValue == null) {
        continue;
      }

      // Should skip token, e.g. whitespace
      if (tokenType == null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: ${string[0]}`);
  }

  /**
   * Matches a regular expression for the provided string
   */
  _match(regExp, string) {
    const matched = regExp.exec(string);
    if (matched) {
      this._cursor += matched[0].length;
      return matched[0];
    }

    return null;
  }
}

module.exports = { Tokenizer };
