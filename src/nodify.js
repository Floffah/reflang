module.exports = parse;

function parse(parsed, dothread) {
    let nodecode = "";

    parsed.forEach((parse) => {
        nodecode += create(parse);
    });

    return `${dothread ? "//thread\nconst{expose}=require('threads/worker');expose(function run(file){return file});\n\n" : ""}\n${nodecode}`;
}

function create(dta) {
    let code = "";
    let data;
    
    if(Array.isArray(dta)) {
        data = dta[0];
    } else {
        data = dta;
    }

    if (data === "newline") {
        code = "\n";
    } else if (data.type === "declare") {
        code = `let ${data.name} = ${valueify(data.value)};`
    } else if (data.type === "send") {
        if (data.destination === "display") {
            code = `console.log(${valueify(data.value)});`
        }
    } else if (data.type === "set") {
        code = `${data.name} = ${valueify(data.value)};`
    } else if(data.type === "if") {
        code = `if(${conditionify(data.condition)}) {${parse(data.children, false)}}`
    }

    return code;
}

function valueify(data) {
    let value = "";

    if (data.dtype === "string") {
        value = `"${data.string}"`
    } else if (data.dtype === "variable") {
        value = data.variable
    }
    return value;
}

function conditionify(data) {
    let condition = "";

    if(data.compare === "equals") {
        condition = `${valueify(data.val1)} === ${valueify(data.val2)}`
    }

    return condition;
}