const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const clientPath = path.resolve(__dirname, 'src/client');
const serverPath = path.resolve(__dirname, 'src/server');

const buildPath = path.resolve(__dirname, '.build');
const publicPath = path.resolve(buildPath, 'public');

module.exports = [
    {
        entry: path.resolve(clientPath, 'index.jsx'),
        output: {
            path: publicPath,
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["absolute/path/a", "absolute/path/b"]
                        }
                    }]
                }
            ]
        },
        resolve: {
            modules: ['node_modules', clientPath],
            extensions: [".js", ".jsx"]
        },
        plugins: [
            new CopyWebpackPlugin([{from: path.resolve(clientPath, 'public'), to: publicPath}]),
            new LiveReloadPlugin(),
        ]
    },
    {
        entry: path.resolve(serverPath, 'index.js'),
        output: {
            path: buildPath,
            filename: 'server.js'
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        resolve: {
            modules: ['node_modules', serverPath]
        },
    }
];
