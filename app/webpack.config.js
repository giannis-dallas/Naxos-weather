const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: {
        entry: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.bundle.js'
    },
    module: {
        rules: [{
            test: /\.(sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader                    
                },
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: './assets/[name].[ext]' }
            }
          ]
        },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
            {
              loader: 'file-loader',
              options: { name: './assets/[name].[ext]' }
            }
          ]
       }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.bundle.css"            
        })
    ]
}