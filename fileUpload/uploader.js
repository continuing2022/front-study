// uploader.js
// 大文件上传器（前端完整实现）

// IndexedDB 工具，保存上传进度
const DB_NAME = "uploadDB";
const STORE_NAME = "uploads";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "fileId" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveProgress(fileId, uploaded) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put({ fileId, uploaded });
  return tx.complete;
}

// 读取历史上传记录
async function getProgress(fileId) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");  
  return tx.objectStore(STORE_NAME).get(fileId);
}

// 上传一个切片（模拟接口）
async function uploadChunk(fileId, chunk, retries = 3) {
  const form = new FormData();
  form.append("fileId", fileId);
  form.append("index", chunk.index);
  form.append("blob", chunk.blob);

  for (let i = 0; i < retries; i++) {
    try {
      // 这里用 fetch 模拟，实际换成你们的上传接口
      await fetch("/upload/chunk", { method: "POST", body: form });
      return true;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // 重试延时
    }
  }
}

// 并发上传调度器
async function uploadChunks(fileId, chunks, concurrency = 3, onProgress) {
  let index = 0;
  let active = 0;
  let uploaded = [];

  return new Promise((resolve, reject) => {
    const next = async () => {
      if (index >= chunks.length && active === 0) {
        return resolve(uploaded);
      }
      while (active < concurrency && index < chunks.length) {
        const chunk = chunks[index++];
        active++;
        uploadChunk(fileId, chunk)
          .then(() => {
            uploaded.push(chunk.index);
            onProgress(uploaded.length / chunks.length);
            saveProgress(fileId, uploaded);
          })
          .catch(reject)
          .finally(() => {
            active--;
            next();
          });
      }
    };
    next();
  });
}

// 主入口
export async function uploadFile(file, { chunkSize = 5 * 1024 * 1024, concurrency = 3 } = {}) {
  const fileId = `${file.name}-${file.size}`; // 简单生成 fileId，实际可用 hash

  // 读取历史进度
  const progress = await getProgress(fileId);
  console.log('Resuming from progress:', progress);
  const uploadedSet = new Set(progress?.uploaded || []);

  // 启动 worker 切片
  const worker = new Worker("worker.js");
  const chunks = [];
  return new Promise((resolve, reject) => {
    worker.postMessage({ file, chunkSize });
    worker.onmessage = async (e) => {
      const { index, blob, done, total } = e.data;
      if (done) {
        // 开始上传
        const pending = chunks.filter((c) => !uploadedSet.has(c.index));
        const uploaded = await uploadChunks(
          fileId,
          pending,
          concurrency,
          (percent) => console.log(`上传进度: ${(percent * 100).toFixed(2)}%`)
        );

        // 上传完成后，调用合并接口
        await fetch("/upload/merge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId, totalChunks: total }),
        });

        console.log("上传完成！");
        resolve();
      } else {
        chunks.push({ index, blob });
      }
    };

    worker.onerror = reject;
  });
}
