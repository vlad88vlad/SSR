import nodeExternals from 'webpack-node-externals';
import alias from '../webpack.alias'
import {IS_DEV} from './env';
import fileLoader from './loaders/file';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import paths from "./paths";

const config = {
    name: 'server',
    target: 'node',
    node: {__dirname: false},
    entry: paths.appServerIndexJs,
    module: {
        rules: [
            ...jsLoader,
            fileLoader.server,
            cssLoader.server
        ],
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: paths.appBuild,
        publicPath: paths.publicUrlOrPath,
    },
    resolve: {
        alias,
        modules: ['.', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],

    },

    devtool: 'source-map',

    performance: {
        hints: IS_DEV ? false : 'warning',
    },

    externals: [nodeExternals({allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i]})],

    optimization: {nodeEnv: false},
};

export default config;
