<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-8 border-blue-600">
      <h2 class="text-2xl font-bold text-center text-blue-900 mb-6">Admin Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@mettamedika.com">
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Password</label>
          <input v-model="password" type="password" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••">
        </div>

        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="isLoading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
          {{ isLoading ? 'Memeriksa...' : 'Masuk' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error
    
    // Jika berhasil, arahkan ke dashboard
    router.push({ name: 'Dashboard' })
  } catch (error) {
    errorMessage.value = 'Email atau password salah!'
  } finally {
    isLoading.value = false
  }
}
</script>