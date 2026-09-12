<template>
  <div class="max-w-3xl mx-auto px-4">
    <!-- Hapus border atas yang lama, dan tambahkan overflow-hidden agar gambar tidak keluar dari sudut membulat -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
      
      <!-- PANEL JUDUL DENGAN BACKGROUND GAMBAR -->
      <!-- Pastikan nama file 'bg-rs.jpg' sesuai dengan nama foto Anda di folder public -->
      <div 
        class="relative px-8 py-10 bg-cover bg-center" 
        style="background-image: url('/bg-rs.jpg');"
      >
        <!-- Overlay biru gelap transparan agar tulisan putih tetap terbaca jelas -->
        <div class="absolute inset-0 bg-blue-900/75"></div>
        
        <!-- Tulisan Judul (Diubah menjadi warna putih dan terang) -->
        <div class="relative z-10">
          <h1 class="text-3xl font-bold text-white mb-1">Survei Kepuasan Pasien</h1>
          <h2 class="text-lg text-blue-100 mb-4">Rawat Jalan - RS. Metta Medika II</h2>
          <p class="text-sm text-gray-200 mb-2">Terima kasih telah meluangkan waktu untuk mengisi survei kepuasan pelayanan kami.</p>
          <div class="text-amber-300 text-sm font-medium">* Wajib diisi</div>
        </div>
      </div>

      <!-- FORM SURVEI BAWAHNYA TETAP SAMA -->
      <!-- Perhatikan penambahan class="p-8 pt-6" pada form agar jaraknya tetap rapi -->
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

        <div class="mb-8 p-5">
          <label class="block font-semibold text-gray-800 mb-2">11. Saran & Kritik</label>
          <textarea v-model="form.saran" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Tuliskan saran dan kritik Anda di sini..."></textarea>
        </div>

        <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl disabled:bg-gray-400 transition-colors shadow-md hover:shadow-lg">
          {{ isSubmitting ? 'Mengirim Data...' : 'Kirim Survei' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { submitSurvey } from '../../services/surveyService'
import RatingInput from '../../components/survey/RatingInput.vue'

const router = useRouter()
const isSubmitting = ref(false)

// State untuk menyimpan jawaban form
const form = reactive({
  nama: '',
  registrasi: 0,
  perawat: 0,
  dokter: 0,
  verifikator: 0,
  lab: 0,
  radiologi: 0,
  farmasi: 0,
  kasir: 0,
  kebersihan: 0,
  saran: ''
})

const handleSubmit = async () => {
  // Validasi: pastikan semua rating sudah diisi (nilainya > 0)
  if (!form.registrasi || !form.perawat || !form.dokter || !form.verifikator || 
      !form.lab || !form.radiologi || !form.farmasi || !form.kasir || !form.kebersihan) {
    alert('Mohon berikan penilaian bintang pada semua pertanyaan (No. 2 sampai 10).')
    return
  }

  try {
    isSubmitting.value = true
    await submitSurvey(form) // Kirim data ke Supabase
    router.push({ name: 'Success' }) // Pindah ke halaman sukses jika berhasil
  } catch (error) {
    alert('Terjadi kesalahan koneksi ke database. Pastikan konfigurasi Supabase Anda benar.')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>