@{%
    const moo = require('moo');

    const lexer = moo.compile({
        //common
        ws:     /[ \t]+/,
        number: /[0-9]+/,
        word: /[a-z]+/,
        nl:{ match: /\n/, lineBreaks: true },

        stringmark: /["']/,

        //send
        to: "TO",
        send: "SEND",
        todisp: "DISPLAY",

        //vars
        declare: "DECLARE",
        init: "INITIALLY",
        set: "SET",

        //conditions
        if: ["IF", "THEN", "END IF"],
        condition: "=="
    });
%}

@lexer lexer

process -> main:+ {%id%}

main -> declare {%id%}
    | send {%id%}
    | set {%id%}
    | if {%id%}
    | %nl {% function (d) { return "newline" } %}

@include "./variables.ne"
@include "./send.ne"
@include "./conditions.ne"