const path = require('path');

const isDev = true;

module.exports = {
    node: false,
    target: "web",
    node: {
        global: false
    },
    mode: isDev ? "development" : "production",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dryv-vee.min.js',
        libraryTarget: 'umd',
        library: 'DryvVee'
    },
    externals: {
        "vue": "Vue",
        "vee-validate": "vee-validate",
        "axios": "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js",
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            local: path.resolve(__dirname, 'src')
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: !isDev
    },
}