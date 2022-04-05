const common = require("./webpack.common");
const WebpackDevserverPlugin = require("webpack-dev-server");
const { default: merge } = require("webpack-merge");

const config = {
    mode: "development",
    devServer: {
        historyApiFallback: true,
        open: false,
        port: 3000,
        hot: true,
    },
    devtool: "eval",
};

module.exports = merge(common, config);
