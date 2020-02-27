const  splitFile = require('split-file');
console.log(__dirname);
splitFile.mergeFiles(['app-newcity-release.apk.sf-part1','app-newcity-release.apk.sf-part2'],  'app-newcity-release.apk' )
    .then(() => {
    console.log('Done!');
})
    .catch((err) => {
        console.log('Error: ', err);
    });


