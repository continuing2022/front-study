import fs from 'fs'
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import {transformFromAst} from '@babel/core';
import path from 'path';
import { jsonLoader } from './jsonLoader.js';
import { styleLoader } from './styleLoader.js';
import ejs from 'ejs';
import { cssLoader } from './cssLoader.js';
// 一个文件的获取依赖文件
const webpackConfig={
  modules:{
    rules:[
      {
        test:/\.json$/,
        use:[jsonLoader],
      },{
        test:/\.css$/,
        use:[styleLoader,cssLoader],
      }
    ]
  }
}

let id=0;
function createAsset(filePath){
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  // 进行文件判断
  const loaders=webpackConfig.modules.rules
  loaders.forEach(({test,use})=>{
    if(test.test(filePath)){
      if(Array.isArray(use)){
        use.slice().reverse().forEach(loader=>{
          fileContent=loader(fileContent)
        })
      }
    }
  })
  // 文件变成AST
  let ast = parser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  // 获取依赖文件
  const deps=[]
  traverse.default(ast, {
    ImportDeclaration(path) {
      deps.push(path.node.source.value);
    }
  });
  // 将文件的import导出变成commonjs
  const { code } = transformFromAst(ast, null, {
    presets: [
      ["@babel/preset-env", {
        targets: {
          browsers: ["last 2 versions"]
        }
      }] 
    ],
    plugins: [
      "@babel/plugin-transform-block-scoping"
    ]
  });
  return {
    filePath, 
    source: code, 
    deps,
    localMap:{},
    id:id++ 
  };
}
// 获取从根目录开始的依赖关系
function createGraph(entry) {
  // 获取文件的信息
  const mainAsset = createAsset(entry);
  // 依赖集
  const graph = [];
  const visited = new Set();
  const queue = [mainAsset];

  while (queue.length > 0) {
    // 去除当前元素
    const asset = queue.shift();
    if (visited.has(asset.filePath)) continue;
    // 将依赖文件放入队列
    visited.add(asset.filePath);
    graph.push(asset);
    // 处理依赖
    asset.deps.forEach(dep => {
      // 获取依赖文件的路径
      const depPath = path.resolve(path.dirname(asset.filePath), dep);
      // 获取依赖文件的信息
      const depAsset = createAsset(depPath); // 创建依赖模块
      asset.localMap[dep] = depAsset.id; // 记录依赖的 id
      queue.push(depAsset); // 加入队列
    });
  }

  return graph;
}
const graph = createGraph("./src/index.js");
// console.log(graph);
function generateBundle(graph) {
  const template=fs.readFileSync('./src/bundle.ejs', 'utf-8');
  const result=ejs.render(template, {data: graph});
  fs.writeFileSync('./dist/new-bundle.js', result); 
}
generateBundle(graph)  