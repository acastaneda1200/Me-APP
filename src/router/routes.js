
const routes = [
  {
    path: '/',
    component: () => import('layouts/NoAuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'perfumes', name: 'perfumes', component: () => import('pages/PerfumesPage.vue') },
      { path: 'gastos', component: () => import('pages/GastosPage.vue') },
      { path: 'zapatillas', component: () => import('pages/ZapatillasPage.vue') },
      { path: 'wish-list', component: () => import('pages/WishListPage.vue') }
    ],
    meta:{
      requiresAuth: true,
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
