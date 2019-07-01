const path = require('path');

module.exports = {
    entry: './public/javascripts/module.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist')
    }
};
