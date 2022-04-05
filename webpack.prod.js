const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { default: merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
    devtool: "hidden-source-map",
    mode: "production",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
        runtimeChunk: {
            name: "runtime",
        },
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
    },
};

module.exports = merge(common, config);
