const fs = require('fs');
const path = require('path');

class DependencyAnalyzerPlugin {
  constructor(options = {}) {
    this.options = {
      outputFile: 'dependency-analysis.json',
      ...options
    };
  }

  apply(compiler) {
    // 在compilation完成后执行
    compiler.hooks.afterCompile.tap('DependencyAnalyzerPlugin', (compilation) => {
      // 获取所有模块
      const modules = compilation.modules;
      const dependencies = {};
      
      // 分析每个模块
      modules.forEach(module => {
        // 跳过没有资源的模块
        if (!module.resource) return;
        
        try {
          const filePath = module.resource;
          const fileName = path.basename(filePath);
          
          // 检查文件是否存在
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            
            dependencies[filePath] = {
              fileName,
              path: filePath,
              size: this.formatSize(fileSizeInBytes),
              sizeInBytes: fileSizeInBytes
            };
          }
        } catch (error) {
          console.error(`分析模块时出错: ${module.resource}`, error);
        }
      });

      // 按文件大小排序
      const sortedDependencies = Object.entries(dependencies)
        .sort((a, b) => b[1].sizeInBytes - a[1].sizeInBytes)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // 生成统计信息
      const outputPath = compiler.outputPath;
      const outputFilePath = path.join(outputPath, this.options.outputFile);
      
      // 添加总结信息
      const summary = {
        totalFiles: Object.keys(dependencies).length,
        totalSize: this.formatSize(
          Object.values(dependencies).reduce((sum, dep) => sum + dep.sizeInBytes, 0)
        ),
        largestFile: Object.values(dependencies).length > 0 
          ? Object.values(dependencies).reduce((largest, current) => 
              current.sizeInBytes > largest.sizeInBytes ? current : largest
            ) 
          : null
      };

      const analysisResult = {
        summary,
        dependencies: sortedDependencies
      };

      // 写入文件
      fs.writeFileSync(outputFilePath, JSON.stringify(analysisResult, null, 2));
      
      console.log(`\n依赖分析信息已生成到: ${this.options.outputFile}`);
      console.log(`总文件数: ${summary.totalFiles}, 总大小: ${summary.totalSize}`);
    });
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

module.exports = DependencyAnalyzerPlugin;