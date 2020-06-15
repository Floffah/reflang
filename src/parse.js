const nearley = require("nearley");
const grammar = require("../parse/grammar.js");
const fs = require('fs');
const path = require('path');
const compile = require('./compile');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed(fs.readFileSync(path.resolve(process.cwd(), process.argv[2]), 'utf8').replace(/\r\n/g, "\n"));

fs.writeFileSync(path.resolve(process.cwd(), process.argv[2] + ".json"), JSON.stringify(parser.results, null, 2), 'utf8');

compile(path.resolve(process.cwd(), process.argv[2]), parser.results);