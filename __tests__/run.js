const assert = require('assert');

/** Main Test Runner */
const { Parser } = require('../src/parser');

const parser = new Parser();

/**
 * List of tests
 */
const tests = [
  /* require('./literal-tests.js'),
  require('./statement-list.tests'),
  require('./block-tests.js'),
  require('./empty-tests.js'), */
  require('./math-tests.js'),
];

/**
 * For manual testing
 */
function exec() {
  const program = `
        (2 + 2) * 3;
    `;
  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

exec();

function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepStrictEqual(ast, expected);
}

tests.forEach((testRun) => testRun(test));
console.log('All Assertions passed');
