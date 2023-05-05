var webpack = require("webpack");
const path = require("path");
// const fs = require("fs");

// include the js minification plugin
const TerserPlugin = require("terser-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const {
    CleanWebpackPlugin,
} = require("clean-webpack-plugin");

module.exports = {
    entry: [
        "./sources/js/index.js",
        "./sources/scss/main.scss",
    ],
    output: {
        filename: "js/app.min.js",
        path: path.resolve(__dirname, "build"),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
        },
        port: 8080,
        hot: true,
        // open: true,

    },
    module: {
        rules: [
            // perform js babelization on all .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.svg$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: (url, resourcePath, context) => {
                        const relativePath = path.relative(
                            context,
                            resourcePath
                        );

                        if (/\/images\//.test(relativePath)) {
                            // return target for svg images
                            return `images/${url}`;
                        } else if (/\/fonts\//.test(relativePath)) {
                            // return target for svg fonts
                            return `fonts/${url}`;
                        }

                        return `other/${url}`;
                    },
                },
            },
            {
                test: /\.(gif|png|jpe?g)/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "./images/[name].[ext]",
                            limit: 5000,
                        },
                    },
                    {
                        loader: "img-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        // Process CSS from node_modules with css-loader only
                        include: /node_modules/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                },
                            },
                        ],
                    },
                    {
                        // Process CSS from src with css-loader and postcss-loader
                        exclude: /node_modules/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                "autoprefixer",
                                                {
                                                    // Options
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            filename: "styles/app.css",
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: "sources/images", to: "images" },
        //     ],
        // }),
    ],
    optimization: {
        minimizer: [
            // enable the js minification plugin
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            // enable the css minification plugin
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        minimize: true,
    },
};
