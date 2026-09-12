import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../services/supabase'

const routes = [
  // Halaman Publik (Survei)
  {
    path: '/',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      { path: '', name: 'Survey', component: () => import('../views/public/Survey.vue') },
      { path: 'success', name: 'Success', component: () => import('../views/public/Success.vue') }
    ]
  },
  // Halaman Admin Login
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/admin/Login.vue')
  },
  // Halaman Admin Dashboard (Terkunci)
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true } // Penanda bahwa halaman ini butuh login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// SISTEM KEAMANAN (Navigation Guard)
router.beforeEach(async (to, from, next) => {
  // Cek apakah ada user yang sedang login di browser ini
  const { data: { session } } = await supabase.auth.getSession()
  
  // Jika mau ke halaman yang terkunci TAPI belum login -> Lempar ke Login
  if (to.meta.requiresAuth && !session) {
    next({ name: 'Login' })
  } 
  // Jika mau ke halaman Login TAPI sudah login -> Lempar ke Dashboard
  else if (to.name === 'Login' && session) {
    next({ name: 'Dashboard' })
  } 
  // Selain itu, biarkan lewat
  else {
    next()
  }
})

export default router