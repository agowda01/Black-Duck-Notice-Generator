const fs = require('fs');

let arguments = process.argv;

if (arguments[2] != null || arguments[2] != undefined) {
    const vssPath = 'vss-extension.json';
    const taskPath = 'licensegenerator/task.json';

    let vssFile = fs.readFileSync(vssPath);
    let taskFile = fs.readFileSync(taskPath);

    let vssJSON = JSON.parse(vssFile);
    let taskJSON = JSON.parse(taskFile);

    let versionValue = arguments[2]

    vssJSON.version = versionValue;

    let splitVersion = versionValue.split('.');

    let majorVersion = splitVersion[0];
    let minorVersion = splitVersion[1];
    let patchVersion = splitVersion[2];

    taskJSON.version.Major = parseInt(majorVersion);
    taskJSON.version.Minor = parseInt(minorVersion);
    taskJSON.version.Patch = parseInt(patchVersion);

    fs.writeFileSync(vssPath, JSON.stringify(vssJSON, null, 2));
    fs.writeFileSync(taskPath, JSON.stringify(taskJSON, null, 2));
}
