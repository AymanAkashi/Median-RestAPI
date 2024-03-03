const webpack = require('webpack')
module.exports = function override(config: any) {
    const fallback = config.resolve.fallback || {}
    Object.assign(fallback, {
        fs: require.resolve('browserify-fs'),
    })
    config.resolve.fallback = fallback
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ])

    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false,
        },
    })

    return config
}
