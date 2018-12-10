const path = require('path');

module.exports = {
    node: false,
    target: "web",
    node: {
        global: false
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'DryvVeeValidate'
    },
    externals: {
        "vue": "Vue",
        "vee-validate": "vee-validate",
        //"axios": "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js",
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
    }
}