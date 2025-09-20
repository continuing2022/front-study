import Vue from 'vue';
import Router from 'vue-router';
import nprogress from 'nprogress';

Vue.use(Router);

const router = new Router({
  // 配置你的路由规则
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
});

// 前置守卫，在路由跳转之前执行
router.beforeEach((to, from, next) => {
  // 开始显示进度条
  nprogress.start();
  next();
});

// 后置守卫，在路由跳转完成之后执行
router.afterEach(() => {
  // 结束显示进度条
  nprogress.done();
});
// Ajax模拟资源加载进度
function loadResource(url) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onprogress = function (event) {
		if (event.lengthComputable) {
			const percentComplete = (event.loaded / event.total) * 100;
			document.getElementById('progress-bar').style.width = percentComplete + '%';
		}
	};
	xhr.onload = function () {
		if (xhr.status === 200) {
			document.getElementById('progress-bar').style.width = '100%';
			setTimeout(() => {
				document.getElementById('progress-bar').style.display = 'none';
			}, 500);
		}
	};
	xhr.send();
}
window.addEventListener('load', () => {
	loadResource('https://example.com/large-file');
});

export default router;