const nearley = require("nearley");
const grammar = require("../parse/grammar.js");
const fs = require('fs');
const path = require('path');
const compile = require('./compile');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed(fs.readFileSync(path.resolve(__dirname, '../test', 'test.ref'), 'utf8').replace(/\r\n/g, "\n"));

fs.writeFileSync(path.resolve(__dirname, '../test', 'test.ref.json'), JSON.stringify(parser.results, null, 2), 'utf8');

compile(path.resolve(__dirname, '../test', 'test.ref'), parser.results);