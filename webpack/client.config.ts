import {
    ProgressPlugin, DefinePlugin, ProvidePlugin, HotModuleReplacementPlugin,
} from 'webpack';
import LoadablePlugin from '@loadable/webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import fileLoader from './loaders/file';
import {IS_DEV, IS_PROD, getClientEnvironment} from './env';
import paths from './paths';

const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {prepareProxy} = require('react-dev-utils/WebpackDevServerUtils');

const webpackDevClientEntry = require.resolve(
    'react-dev-utils/webpackHotDevClient',
);
const reactRefreshOverlayEntry = require.resolve(
    'react-dev-utils/refreshOverlayInterop',
);

const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');

const proxy = prepareProxy(
    require('../package.json').proxy,
    paths.appPublic,
    paths.publicUrlOrPath,
);

const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH;
const sockPort = process.env.WDS_SOCKET_PORT;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const config = {
    experiments: {
        lazyCompilation: false,
    },
    target: IS_DEV ? 'web' : 'browserslist',
    entry: paths.appIndexJs,

    output: {
        pathinfo: IS_DEV,
        publicPath: paths.publicUrlOrPath,
        path: IS_PROD ? paths.appBuild : undefined,
        filename: IS_PROD
            ? 'static/js/[name].[contenthash:8].js'
            : 'static/js/[name].bundle.js',
        chunkFilename: IS_PROD
            ? 'static/js/[name].[contenthash:8].chunk.js'
            : 'static/js/[name].chunk.js',
    },
    resolve: {
        alias: {
            process: 'process/browser',
        },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [
            'node_modules', 'src',
        ],
    },
    module: {
        rules: [
            {
                oneOf: [
                    ...jsLoader,
                    cssLoader.client,
                    fileLoader.client,
                ],
            },
        ],
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebPackPlugin(
            {

                inject: true,
                template: paths.appHtml,
                ...(IS_PROD
                    ? {
                        minify: {
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                            removeComments: true,
                            useShortDoctype: true,
                            keepClosingSlash: true,
                            collapseWhitespace: true,
                            removeEmptyAttributes: true,
                            removeRedundantAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                        },
                    }
                    : undefined),
            },
        ),

        new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime-.+[.]js/]),
        new ModuleNotFoundPlugin(paths.appPath),

        new DefinePlugin(env.stringified),
        IS_DEV && new HotModuleReplacementPlugin(),
        IS_DEV && (
            new ReactRefreshWebpackPlugin({
                overlay: {
                    entry: webpackDevClientEntry,
                    module: reactRefreshOverlayEntry,
                    sockIntegration: false,
                },
            })
        ),
        new InterpolateHtmlPlugin(HtmlWebPackPlugin, env.raw),
        new ProvidePlugin({process: 'process/browser'}),
        IS_DEV && new CaseSensitivePathsPlugin(),
        IS_DEV
        && new WatchMissingNodeModulesPlugin(paths.appNodeModules),

        IS_PROD
        && new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),

        new LoadablePlugin(),
        new ESLintPlugin({
            // Plugin options
            failOnError: false,
            emitWarning: true,
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
            context: paths.appSrc,
            cache: false,
            // ESLint class options
            cwd: paths.appPath,
            resolvePluginsRelativeTo: __dirname,
            baseConfig: {
                extends: [require.resolve('eslint-config-react-app/base')],

            },
        }),
        new ProgressPlugin(),
    ].filter(Boolean),

    optimization: {
        minimize: IS_PROD,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        inline: 2,
                        warnings: false,
                        comparisons: false,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),

            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
                cssProcessorPluginOptions: {
                    preset: ['default', {minifyFontValues: {removeQuotes: false}}],
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            cacheGroups: {
                styles: {
                    name: false,
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    },

    devServer: {
        port: 3007,
        host: 'localhost',
        sockHost,
        sockPath,
        sockPort,
        hot: true,
        open: true,
        compress: true,
        transportMode: 'ws',
        watchContentBase: true,
        disableHostCheck: true,
        contentBase: paths.appPublic,
        contentBasePublicPath: paths.publicUrlOrPath,
        publicPath: paths.publicUrlOrPath.slice(0, -1),
        stats: {
            hash: false,
            noInfo: true,
            colors: true,
            assets: false,
            chunks: false,
            source: false,
            modules: false,
            reasons: false,
            children: false,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
            disableDotRule: true,
            index: paths.publicUrlOrPath,
        },
        proxy,
    },

    stats: {
        colors: true,
        assets: false,
        chunks: false,
        modules: false,
    },
    node: {
        global: true,
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
};

export default config;
