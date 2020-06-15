// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require('moo');

    const lexer = moo.compile({

    // common
    ws:     /[ \t]+/,
    number: /[0-9]+/,
    word: /[a-z]+/,
    nl:{ match: /\n/, lineBreaks: true },
    to: "TO",

    // declare/set
    declare: "DECLARE",
    init: "INITIALLY",
    set: "SET",

    // send
    send: "SEND",
    // destination
    todisp: "DISPLAY",

    // data types
    stringmark: /["']/,
    });
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "process$ebnf$1", "symbols": ["main"]},
    {"name": "process$ebnf$1", "symbols": ["process$ebnf$1", "main"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "process", "symbols": ["process$ebnf$1"], "postprocess": id},
    {"name": "main", "symbols": ["declare"], "postprocess": id},
    {"name": "main", "symbols": ["send"], "postprocess": id},
    {"name": "main", "symbols": ["set"], "postprocess": id},
    {"name": "main", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": function (d) { return "newline" }},
    {"name": "declare", "symbols": [{"literal":"DECLARE"}, (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("word") ? {type: "word"} : word), (lexer.has("ws") ? {type: "ws"} : ws), {"literal":"INITIALLY"}, (lexer.has("ws") ? {type: "ws"} : ws), "value"], "postprocess": (d) => { return { type: 'declare', name: d[2].value, value: d[6] } }},
    {"name": "set", "symbols": [{"literal":"SET"}, (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("word") ? {type: "word"} : word), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("to") ? {type: "to"} : to), (lexer.has("ws") ? {type: "ws"} : ws), "value"], "postprocess": function(d) { return { type: 'set', name: d[2].value, value: d[6] } }},
    {"name": "send", "symbols": [{"literal":"SEND"}, (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("word") ? {type: "word"} : word), (lexer.has("ws") ? {type: "ws"} : ws), (lexer.has("to") ? {type: "to"} : to), (lexer.has("ws") ? {type: "ws"} : ws), "destination"], "postprocess": function (d) { return { type: 'send', destination: d[6], variable: d[2].value } }},
    {"name": "destination", "symbols": [(lexer.has("todisp") ? {type: "todisp"} : todisp)], "postprocess": function (d) { return 'display' }},
    {"name": "value", "symbols": [(lexer.has("stringmark") ? {type: "stringmark"} : stringmark), (lexer.has("word") ? {type: "word"} : word), (lexer.has("stringmark") ? {type: "stringmark"} : stringmark)], "postprocess": function(d) { return { type: 'data', dtype: 'string', string: d[1].value } }}
]
  , ParserStart: "process"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
