<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      
      <!-- Panel Judul dengan Background Foto -->
      <div 
        class="relative px-8 py-10 bg-cover bg-center" 
        style="background-image: url('/bg-rs.jpg');"
      >
        <div class="absolute inset-0 bg-blue-900/75"></div>
        <div class="relative z-10">
          <h1 class="text-3xl font-bold text-white mb-1">Survei Kepuasan Pasien</h1>
          <h2 class="text-lg text-blue-100 mb-4">Rawat Jalan - RS. Metta Medika II</h2>
          <p class="text-sm text-gray-200 mb-2">Terima kasih telah meluangkan waktu untuk mengisi survei kepuasan pelayanan kami.</p>
          <div class="text-amber-300 text-sm font-medium">* Wajib diisi</div>
        </div>
      </div>

      <!-- Form Survei -->
      <form @submit.prevent="handleSubmit" class="p-8 pt-6">
        
        <!-- Field Nama Pasien -->
        <div class="mb-6">
          <label class="block font-semibold text-gray-800 mb-2">1. Nama Pasien <span class="text-red-500">*</span></label>
          <input 
            v-model="form.nama" 
            type="text" 
            required 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            placeholder="Masukkan nama lengkap Anda..."
          >
        </div>

        <RatingInput v-model="form.registrasi" label="2. Pelayanan Petugas Registrasi" description="Silakan beri penilaian tentang pelayanan petugas registrasi." />
        <RatingInput v-model="form.perawat" label="3. Pelayanan Petugas Perawat Poli" description="Silakan beri penilaian tentang pelayanan petugas perawat poli." />
        <RatingInput v-model="form.dokter" label="4. Pelayanan Dokter Spesialis" description="Silakan beri penilaian tentang pelayanan dokter spesialis." />
        <RatingInput v-model="form.verifikator" label="5. Pelayanan Petugas Verifikator" description="Silakan beri penilaian tentang pelayanan petugas verifikator." />
        <RatingInput v-model="form.lab" label="6. Pelayanan Petugas Laboratorium" description="Silakan beri penilaian tentang pelayanan petugas laboratorium." />
        <RatingInput v-model="form.radiologi" label="7. Pelayanan Petugas Radiologi" description="Silakan beri penilaian tentang pelayanan petugas radiologi." />
        <RatingInput v-model="form.farmasi" label="8. Pelayanan Petugas Farmasi" description="Silakan beri penilaian tentang pelayanan petugas farmasi." />
        <RatingInput v-model="form.kasir" label="9. Pelayanan Petugas Kasir" description="Silakan beri penilaian tentang pelayanan petugas kasir." />
        <RatingInput v-model="form.kebersihan" label="10. Kebersihan dan Kenyamanan Ruang Tunggu: Poli" description="Silakan beri penilaian tentang kebersihan dan kenyamanan ruang tunggu poli." />

        <div class="mb-8">
          <label class="block font-semibold text-gray-800 mb-2">11. Saran & Kritik</label>
          <textarea 
            v-model="form.saran" 
            rows="4" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            placeholder="Tuliskan saran dan kritik Anda di sini..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md disabled:bg-blue-300"
        >
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Survei' }}
        </button>
      </form>
    </div>

    <!-- Copyright Footer -->
    <div class="text-center text-xs text-slate-400 pb-4">
      &copy; 2026 Leo Rentius. All rights reserved.
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'
import RatingInput from '@/components/RatingInput.vue'

const router = useRouter()
const isSubmitting = ref(false)

const form = reactive({
  nama: '',
  registrasi: 5,
  perawat: 5,
  dokter: 5,
  verifikator: 5,
  lab: 5,
  radiologi: 5,
  farmasi: 5,
  kasir: 5,
  kebersihan: 5,
  saran: ''
})

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    const { error } = await supabase.from('responses').insert([form])
    if (error) throw error
    router.push({ name: 'Success' })
  } catch (error) {
    alert('Terjadi kesalahan saat mengirim survei. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>