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

    if (!Number.isNaN(Number(string[0]))) {
      let number = '';
      while (!Number.isNaN(Number(string[this._cursor]))) {
        number += string[this._cursor++];
      }
      return {
        type: 'NUMBER',
        value: number,
      };
    }

    if (string[0] === '"' || string[0] === "'") {
      let s = '';
      do {
        s += string[this._cursor++];
      } while (
        string[this._cursor] !== '"' &&
        string[this._cursor] !== "'" &&
        !this.isEOF()
      );
      s += this._cursor++;
      return {
        type: 'STRING',
        value: s,
      };
    }
  }
}

module.exports = { Tokenizer };
