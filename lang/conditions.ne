@lexer lexer

if -> "IF" %ws condition %ws "THEN" %nl (%ws|main):+ {% function (d) {} %}



condition -> value %ws "==" %ws value

@include "./value.ne"