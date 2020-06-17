@lexer lexer

declare -> "DECLARE" %ws %word %ws "INITIALLY" %ws value {% (d) => { return { type: 'declare', name: d[2].value, value: d[6] } } %}

set -> "SET" %ws %word %ws %to %ws value {% function(d) { return { type: 'set', name: d[2].value, value: d[6] } } %}

@include "./value.ne"