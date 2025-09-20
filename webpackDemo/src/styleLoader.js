export function styleLoader(source){
    // // 使用正则表达式提取 CSS 源代码部分
    // const cssSource = source.match(/(?<=__CSS_SOURCE__)((.|\s)*?)(?=\*\/)/g);
    // // 使用正则表达式提取类名映射部分
    // const classKeyMap = source.match(
    //     /(?<=__CSS_classKeyMap__)((.|\s)*?)(?=\*\/)/g
    // );
    // 创建基本的 style 标签脚本
    let script = `var style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);`;
    // 如果有类名映射，添加导出语句
    // if (classKeyMap !== null) {
    //     script += `module.exports = ${classKeyMap};`;
    // }
    return script;
} 