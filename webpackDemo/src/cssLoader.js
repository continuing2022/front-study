export function cssLoader (source) {    
    const reg = /(?<=\.)(.*?)(?={)/g;
    // 创建类名映射对象，键和值都是类名（trim 后的）
    const classKeyMap = Object.fromEntries(
        source.match(reg).map((str) => [str.trim(), str.trim()])
    );
    const cssHashMap = new Map();
    // 替换源代码中的类名，添加哈希值
    source = source.replace(reg, (result) => {
        const key = result.trim();
        const cssHash = Math.random().toString(16).slice(2, 6);
        cssHashMap.set(key, cssHash);
        return `${key}-${cssHash}`; // 返回带哈希的类名
    });
    // console.log('cssHashMap', cssHashMap);
    // console.log(source)
    // 更新类名映射对象，添加哈希值
    console.log('classKeyMap', classKeyMap);
    Object.entries(classKeyMap).forEach((item) => {
        classKeyMap[item[0]] = `${item[1]}-${cssHashMap.get(item[0])}`;
    });
    // 返回处理后的结果，包含原始代码和类名映射
    return `/**__CSS_SOURCE_${source}__**//**__CSS_classKeyMap_${JSON.stringify(
        classKeyMap
    )}__**/`; 
}; 