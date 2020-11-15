/** Main Test Runner */

const { Parser } = require('../src/parser');

const parser = new Parser();

const program = '"Hello';

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
