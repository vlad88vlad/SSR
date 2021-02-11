import {IS_DEV, IS_PROD} from '../env';
import paths from '../paths';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


export default {
    client: {
        test: /\.css$/,
        use: [
            IS_DEV && require.resolve('style-loader'),
            IS_PROD && {
                loader: MiniCssExtractPlugin.loader,
               options: paths.publicUrlOrPath.startsWith('.')
                    ? {publicPath: '../../'}
                    : {},
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                    sourceMap: IS_PROD
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    sourceMap: IS_PROD
                },
            }
        ].filter(Boolean),
    },
    server: {
        test: /\.css$/,
        loader: 'null-loader',
    },
};
