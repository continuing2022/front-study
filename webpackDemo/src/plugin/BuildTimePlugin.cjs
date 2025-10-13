class BuildTimePlugin {
  apply(compiler) {
    let startTime;
    compiler.hooks.compile.tap('BuildTimePlugin', () => {
      startTime = Date.now();
      console.log('开始编译...');
    });
    compiler.hooks.done.tap('BuildTimePlugin', () => {
      const endTime = Date.now();
      console.log(`⏱️ 编译完成，用时 ${(endTime - startTime) / 1000}s`);
    });
  }
}
module.exports = BuildTimePlugin;