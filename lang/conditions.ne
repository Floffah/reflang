@lexer lexer

if -> "IF" %ws condition %ws "THEN" %nl (%ws|main):+ "END IF" {% function (d) { return { type: 'if', condition: d[2], children: d[6] } } %}



condition -> value %ws "==" %ws value {% function (d) { return { compare: 'equals', val1: d[0], val2: d[4] } } %}

@include "./value.ne"