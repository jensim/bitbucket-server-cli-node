var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'development',
    target: "node",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.BannerPlugin({banner: "#!/usr/bin/env node", raw: true}),
        new webpack.SourceMapDevToolPlugin({}),
    ],
};
