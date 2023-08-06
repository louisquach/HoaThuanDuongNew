const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
    ],
    module: {
        rules: [
          {
            test:  /\.js|\.jsx$/,
            include: path.resolve(__dirname, "src"),
            exclude: path.resolve(__dirname, "node_modules"),
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                    "@babel/preset-react"
                  ],
                },
              },
            ],
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          }
        ]
    },
    optimization: {
        splitChunks: {
          chunks: "async",
        },
    },
};

