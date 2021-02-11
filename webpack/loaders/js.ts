import {IS_DEV, IS_PROD} from "../env";
import paths from "../paths";


export default [
    {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
            exclude: [
                /node_modules[\\\/]core-js/,
                /node_modules[\\\/]webpack[\\\/]buildin/
            ],
            plugins: [
                [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                        loaderMap: {
                            svg: {
                                ReactComponent:
                                    '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                            }
                        }
                    }
                ],
                (IS_DEV) && require.resolve('react-refresh/babel')
            ].filter(Boolean),
            cacheDirectory: true,
            cacheCompression: false,
            compact: IS_PROD
        }
    },
    {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
            configFile: false,
            compact: false,
            presets: [
                [
                    require.resolve('babel-preset-react-app/dependencies'),
                    {helpers: true}
                ]
            ],
            cacheDirectory: true,
            cacheCompression: false,
            sourceMaps: false,
            inputSourceMap: false
        }
    },
]
