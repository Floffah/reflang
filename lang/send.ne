@lexer lexer

send -> "SEND" %ws value %ws %to %ws destination {%function (d) { return { type: 'send', destination: d[6], value: d[2] } } %}

destination -> %todisp {% function (d) { return 'display' } %}

@include "./value.ne"