var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'production',
    target: "node",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: false,
    plugins: [
        new webpack.BannerPlugin({banner: "#!/usr/bin/env node", raw: true}),
    ],
};
