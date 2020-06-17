@lexer lexer

value -> %stringmark %word %stringmark {% function(d) { return { type: 'data', dtype: 'string', string: d[1].value } } %}
    | %word {% function(d) { return { type: 'data', dtype: 'variable', variable: d[0].value } } %}