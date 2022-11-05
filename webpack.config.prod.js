const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const cssModuleRegex = /\.module\.css$/;

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: "source-map",
    module: {
        rules: [
          {
             test: /\.(js|jsx)$/,
             exclude: /node_modules/,
             use: ['babel-loader']
          },
          {
             test: /\.(s(a|c)ss)$/,
             use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [new MiniCssExtractPlugin()],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },
};
