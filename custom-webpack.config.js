module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'lazySingletonStyleTag' }
                    },
                    'css-loader',
                ]
            }
        ]
    },
};