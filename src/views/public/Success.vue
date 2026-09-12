<template>
  <div class="max-w-md mx-auto mt-20 bg-white p-10 rounded-2xl shadow-lg border-t-8 border-blue-600 text-center">
    <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h2>
    <p class="text-gray-600 mb-8">Survei kepuasan Anda telah berhasil dikirim.</p>
    
    <router-link :to="{ name: 'Survey' }" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
      Isi Survei Lagi
    </router-link>
  </div>
</template>