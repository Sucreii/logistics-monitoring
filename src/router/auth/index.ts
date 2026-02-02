import type { RouteRecordRaw } from 'vue-router';

export const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'auth.page',
        component: () => import('src/pages/IndexPage.vue'),
      },
    ],
  },
];
