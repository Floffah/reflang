const nodify = require('./nodify.js');
const fs = require('fs');

module.exports = (fln, results) => {
    const nodecode = nodify(results[0]);
    fs.writeFileSync(fln.replace(".ref", ".js"), nodecode);
}