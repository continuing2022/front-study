class FileSizePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('FileSizePlugin', (compilation) => {
      console.log('\n📦 文件体积统计：');
      for (const [filename, source] of Object.entries(compilation.assets)) {
        const size = (source.size() / 1024).toFixed(2) + ' KB';
        console.log(`  - ${filename}: ${size}`);
      }
    });
  }
}
module.exports = FileSizePlugin;