<template>
  <div class="min-h-screen bg-[#f0f6fc] font-sans">
    <main class="py-10">
      <!-- Konten halaman Survey atau Success akan dirender di sini -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>