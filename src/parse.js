require('pretty-error').start();

const nearley = require("nearley");
const grammar = require("../parse/grammar.js");
const fs = require('fs');
const path = require('path');
const compile = require('./compile');

if(!fs.existsSync("./compile")) {
    fs.mkdirSync("./compile");
}

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

fs.readFileSync(path.resolve(process.cwd(), process.argv[2]), 'utf8').replace(/\r\n/g, "\n").split("\n").forEach(line => {
    parser.feed(line);
});

if(process.argv.includes("--dev")) {
    fs.writeFileSync(`./compile/${process.argv[2].split(/[/\\]/)[process.argv[2].split(/[/\\]/).length - 1]}` + ".json", JSON.stringify(parser.results, null, 2), 'utf8');
}

compile(path.resolve(process.cwd(), process.argv[2]), parser.results, process.argv[2]);