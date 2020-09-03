import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue'),
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: () => import(/* webpackChunkName: "checkbox" */ '../views/Checkbox.vue'),
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import(/* webpackChunkName: "radio" */ '../views/Radio.vue'),
  },
  {
    path: '/display',
    name: 'Display',
    component: () => import(/* webpackChunkName: "display" */ '../views/Display.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
