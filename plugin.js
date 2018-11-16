class FileListPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            'FileListPlugin',
            (compilation, callback) => {
                // 在生成文件中，创建一个头部字符串：
                var filelist = 'In this build:\n\n';

                // 遍历所有编译过的资源文件，
                // 对于每个文件名称，都添加一行内容
                let keys = Object.keys(compilation.assets);
                keys = keys.filter(k => {
                    return /\.txt$/.exec(k);
                });
                let txtContent = ``;
                for (var filename in compilation.assets) {
                    filelist += '- ' + filename + '\n';
                }

                keys.forEach(key => {
                    txtContent += `${compilation.assets[key]
                        .source()
                        .toString()}`;
                });
                const res = compilation.assets[
                    compilation.options.output.filename
                ].source();

                console.log('====================================');
                console.log(txtContent);
                console.log(typeof txtContent);
                console.log(
                    txtContent.replace(/\n/g, '=-=').replace(/=-=/g, '\\==')
                );
                console.log('====================================');
                // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
                compilation.assets[compilation.options.output.filename] = {
                    source() {
                        return res.replace(
                            /res\.\w*?\.txt/,
                            txtContent
                                .replace(/\n/g, '=-=')
                                .replace(/=-=/g, '\\\\n')
                        );
                    },
                    size() {
                        return res.length;
                    }
                };

                callback();
            }
        );
    }
}

module.exports = FileListPlugin;
