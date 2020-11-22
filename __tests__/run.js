const assert = require('assert');

/** Main Test Runner */
const { Parser } = require('../src/parser');

const parser = new Parser();

/**
 * List of tests
 */
const tests = [
  require('./literal-tests.js'),
  require('./statement-list.tests'),
];

/**
 * For manual testing
 */
function exec() {
  const program = `
        /**
         * Hello World
         */
        "Hello Back";
    `;
  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

exec();

function test(program, expected) {
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
  assert.deepStrictEqual(ast, expected);
}

tests.forEach((testRun) => testRun(test));
console.log('All Assertions passed');
