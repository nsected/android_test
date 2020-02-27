const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './app-newcity-release.apk',
},
output: {
    filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
},
};