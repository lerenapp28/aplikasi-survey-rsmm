<template>
  <div class="mb-6 bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
    <label class="block font-semibold text-gray-800 mb-1">{{ label }} <span class="text-red-500">*</span></label>
    <p class="text-sm text-gray-500 mb-3">{{ description }}</p>
    
    <div class="flex gap-2 cursor-pointer">
      <span 
        v-for="i in 5" :key="i"
        @click="$emit('update:modelValue', i)"
        @mouseenter="hover = i"
        @mouseleave="hover = 0"
        :class="[
          i <= (hover || modelValue) ? 'text-amber-400 scale-110' : 'text-gray-200', 
          'text-4xl transition-all duration-150 select-none'
        ]"
      >
        ★
      </span>
    </div>
    <div class="text-blue-600 font-semibold text-sm mt-2 h-5">
      {{ ratingTexts[modelValue] || '' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: Number,
  label: String,
  description: String
})
defineEmits(['update:modelValue'])

const hover = ref(0)
const ratingTexts = {
  1: "Sangat Tidak Puas",
  2: "Tidak Puas",
  3: "Cukup",
  4: "Puas",
  5: "Sangat Puas"
}
</script>