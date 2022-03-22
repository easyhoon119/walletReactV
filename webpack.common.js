const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
    entry : './src/index.tsx',
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[chunkhash].js'
    },
    resolve : {
        extensions : [".js", ".jsx",".ts", ".tsx"]
    }
    ,
    module : {
        rules : [
            {
            test : /\.css$/i,
            use : [
                {
                    loader : MiniCssExtractPlugin.loader
                }
                ,
                {
                    loader : 'css-loader',
                    options : {
                        modules : true
                    }
                },
                {
                    loader : 'postcss-loader',
                }
            ]
        }, 
        {
            test : /\.(woff|woff2|eot|ttf|otf)$/i,
            use : [{
                loader : 'url-loader',
                options : {
                    limit : 5000,
                    fallback : 'file-loader',
                    name : '[contenthash].[ext]',
                    outputPath : 'assets/fonts/'
                }
            }]
        },
        {
            test : /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i,
            use : [{
                loader : 'url-loader',
                options : {
                    limit : 5000,
                    fallback : 'file-loader',
                    name : '[contenthash].[ext]',
                    outputPath : 'assets/images/'
                }
            }]
        },
        {
            test : /\.tsx?$/,
            exclude : /node_modules/,
            use : ["babel-loader","ts-loader"],
        }
    ]
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename : '[contenthash].css'
        }),
        new webpack.ProvidePlugin({
            React : 'react'
        })
        ,
        new HtmlWebpackPlugin({
            template : './public/index.html',
            minify: isProduction ? {
                collapseWhitespace: true,
                useShortDoctype: true,
                removeScriptTypeAttributes: true
            } : false
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            IS_PRODUCTION: isProduction,
            'process.env' : JSON.stringify(process.env)
        })
    ],
}