@{%
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
%}

@lexer lexer

process -> main:+ {%id%}

main -> declare {%id%}
    | send {%id%}
    | set {%id%}
    | %nl {% function (d) { return "newline" } %}


declare -> "DECLARE" %ws %word %ws "INITIALLY" %ws value {% (d) => { return { type: 'declare', name: d[2].value, value: d[6] } } %}

set -> "SET" %ws %word %ws %to %ws value {% function(d) { return { type: 'set', name: d[2].value, value: d[6] } } %}



send -> "SEND" %ws %word %ws %to %ws destination {%function (d) { return { type: 'send', destination: d[6], variable: d[2].value } } %}

destination -> %todisp {% function (d) { return 'display' } %}



value -> %stringmark %word %stringmark {% function(d) { return { type: 'data', dtype: 'string', string: d[1].value } } %}
