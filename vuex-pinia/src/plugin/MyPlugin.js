

// plugins/MyPlugin.js
export default function MyPlugin() {
  return {
    name: 'MyPlugin',

    configResolved(config) {
      console.log('🔧 配置解析完成');
    },

    buildStart() {
      console.log('🏗️ 开始构建');
    },

    transform(code, id) {
      if (id.endsWith('.js')) {
        console.log('⚙️ 正在处理:', id);
      }
      return null;
    },

    generateBundle(options, bundle) {
      console.log('📦 输出资源:', Object.keys(bundle));
    },

    closeBundle() {
      console.log('✅ 构建完成');
    }
  };
}
