module.exports = (parsed) => {
    let nodecode = "";

    parsed.forEach((parse) => {
        nodecode += create(parse);
    });

    return nodecode;
}

function create(data) {
    let code;

    if(data === "newline") {
        code = "\n";
    } else if(data.type === "declare") {
        code = `let ${data.name} = ${valueify(data.value)}`
    } else if(data.type === "send") {
        if(data.destination === "display") {
            code = `console.log(${data.variable})`
        }
    } else if(data.type === "set") {
        code = `${data.name} = ${valueify(data.value)}`
    }

    return code;
}

function valueify(data) {
    let value;

    if(data.dtype === "string") {
        value = `"${data.string}"`
    }
    return value;
}