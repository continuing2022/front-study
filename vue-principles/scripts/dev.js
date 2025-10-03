// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件
// node dev.js (要打包的名字 -f 打包的格式) === argv.slice(2)
import minimist from "minimist";
import {resolve,dirname} from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";
// node中的命令行参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));
const target = args._[0] || "reactivity"; // 打包哪个项目
const format = args.f || "iife"; // 打包后的模块化规范
// console.log(`打包目标: ${target}, 打包格式: ${format}`);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require=createRequire(import.meta.url);

// 入口文件
const entryFile = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);
// console.log(__filename,__dirname);
// 根据需要进行打包
esbuild.context({
  entryPoints: [entryFile], // 入口
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`), // 出口
  bundle: true, // 是否打包依赖
  sourcemap: true, // 是否生成source-map 可以调试源代码
  format, // 打包格式 cjs esm iife iife需要名称
  globalName: pkg.buildOptions?.name, // 通过package.json中的buildOptions.name来指定打包后的全局变量名称
}).then(ctx=>{
  console.log(`正在监听 ${target} 文件的变化...`);
  // 监听文件变化，自动打包
  ctx.watch()
})