const fs = require('fs');
const path = require('path');

class FileStatisticsPlugin {
  constructor(options = {}) {
    this.options = {
      outputFile: 'file-statistics.json',
      ...options
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap('FileStatisticsPlugin', (stats) => {
      const outputPath = compiler.outputPath;
      const assets = stats.compilation.assets;
      const fileStatistics = {};

      // 收集文件统计信息
      Object.keys(assets).forEach(filename => {
        const asset = assets[filename];
        const size = asset.size();
        fileStatistics[filename] = {
          size: this.formatSize(size),
          sizeInBytes: size
        };
      });

      // 生成统计文件
      const outputFilePath = path.join(outputPath, this.options.outputFile);
      const content = JSON.stringify(fileStatistics, null, 2);
      
      fs.writeFileSync(outputFilePath, content);
      
      console.log(`\n文件统计信息已生成到: ${this.options.outputFile}`);
    });
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

module.exports = FileStatisticsPlugin;