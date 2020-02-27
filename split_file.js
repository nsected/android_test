const splitFile = require('split-file');

splitFile.splitFile('./utils/app-newcity-release.apk', 2)
    .then((names) => {
        console.log(names);
    })
    .catch((err) => {
        console.log('Error: ', err);
    });