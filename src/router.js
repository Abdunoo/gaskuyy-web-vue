import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import DetailProduct from './views/DtlProduct.vue';
import Category from './components/Category.vue';
import Cart from './views/Cart.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
//   { path: '/dashboard', component: Dashboard, children: 
//   	[
// 		{path:':cat', component:Category},
// 	] 
//   },
  { path: '/dashboard', component: Dashboard },
  { path: '/product/:id', component: DetailProduct },
  {path:'/cart', component: Cart},
  {path:'/admin', component: Admin, meta: { requiresAuth: true }},
  {path:'/login', component: Login}
]

const router = createRouter({
	history: createWebHistory(),
	base: '',
	routes,
	scrollBehavior(to, from, savedPosition) {
	  // always scroll to top
	  return { top: 0 }
	},
});

// router.beforeEach((to, from, next) => {
// 	if (to.meta.requiresAuth) {
// 		let role = localStorage.getItem('role');
// 		if (role != 'admin') {
// 			next('/login');
// 		} 
// 	}
//  });

 export default router;
