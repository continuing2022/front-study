// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件

// node dev.js (要打包的名字 -f 打包的格式) === argv.slice(2)

import minimist from "minimist";
import {resolve,dirname} from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
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
console.log(__filename,__dirname);
// 根据需要进行打包