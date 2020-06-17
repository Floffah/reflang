module.exports = (parsed, fln, dothread) => {
    let nodecode = "";

    parsed.forEach((parse) => {
        nodecode += create(parse);
    });

    return `${dothread ? "//thread\nconst{expose}=require('threads/worker');expose(function run(file){return file});\n\n" : ""}//${fln}\n${nodecode};`;
}

function create(data) {
    let code;

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
    }

    return code;
}

function valueify(data) {
    let value;

    if (data.dtype === "string") {
        value = `"${data.string}"`
    } else if (data.dtype === "variable") {
        value = data.variable
    }
    return value;
}