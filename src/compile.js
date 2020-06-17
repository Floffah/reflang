const nodify = require('./nodify.js');
const fs = require('fs');
const threads = require('threads');
const path = require('path');
const chalk = require('chalk');

module.exports = async (fln, results, abs) => {
    const nodecode = nodify(results[0], process.argv.includes("--thread"));
    fs.writeFileSync(path.resolve(`./compile/${abs.replace(".ref", ".js").split(/[/\\]/)[abs.replace(".ref", ".js").split(/[/\\]/).length - 1]}`), await nodecode);

    if(process.argv.includes("--thread")) {
        const script = await threads.spawn(new threads.Worker(`../compile/${abs.replace(".ref", ".js").split(/[/\\]/)[abs.replace(".ref", ".js").split(/[/\\]/).length - 1]}`));
        let run = await script(fln);
        console.log(chalk`{blue Running file:} {yellow ${run}}`);
        await threads.Thread.terminate(script);
    } else {
        console.log(chalk`{blue Running file:} {yellow ${fln}}`);
        let script = require(`../compile/${abs.replace(".ref", ".js").split(/[/\\]/)[abs.replace(".ref", ".js").split(/[/\\]/).length - 1]}`)
    }
}