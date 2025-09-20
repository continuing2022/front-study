// 无限滚动实现示例
const content = document.getElementById('content');
let loading = false;
let page = 1;
const pageSize = 10;

// 模拟异步加载数据
function loadData(page, pageSize) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const items = [];
            for (let i = 0; i < pageSize; i++) {
                items.push(`第${(page - 1) * pageSize + i + 1}条内容`);
            }
            resolve(items);
        }, 500);
    });
}

// 追加内容到页面
function appendItems(items) {
    items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.className = 'item';
        content.appendChild(div);
    });
}

// 滚动事件处理
window.addEventListener('scroll', async function () {
    if (loading) return;
    // 距离底部 100px 时触发加载
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loading = true;
        const items = await loadData(++page, pageSize);
        appendItems(items);
        loading = false;
    }
});

// 初始化加载内容
loadData(page, pageSize).then(appendItems);