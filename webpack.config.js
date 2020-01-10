const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, "js", "client.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/build"
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        watchContentBase: true,
        watchOptions: {
          poll: true
        }
    },
};
  