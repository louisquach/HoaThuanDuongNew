const path = require('path');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        rules: [
          {
             test: /\.(js|jsx)$/,
             exclude: /node_modules/,
             use: ['babel-loader'],
          },
          {
             test: /\.(s(a|c)ss)$/,
             use: ["style-loader", 'css-loader', 'sass-loader']
          }
        ]
    },
};
