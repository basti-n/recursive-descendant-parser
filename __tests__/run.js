/** Main Test Runner */

const { Parser } = require('../src/parser');

const parser = new Parser();

const program = `
    /**
     * Hello World
     */
    "Hello Back"
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
