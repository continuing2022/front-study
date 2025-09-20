// worker.js
// 专门负责切片，避免主线程卡顿
self.onmessage = (e) => {
  // console.log('Worker received message:', e.data);
  const { file, chunkSize } = e.data;
  const total = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < total; i++) {
    const start = i * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const blob = file.slice(start, end);

    // 发送切片信息给主线程
    self.postMessage({
      index: i,
      blob,
      start,
      end,
      size: blob.size,
    });
  }

  // 通知切片完成
  self.postMessage({ done: true, total });
};
