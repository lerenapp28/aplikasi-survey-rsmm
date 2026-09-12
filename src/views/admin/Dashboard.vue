<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <!-- Navbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <i class="fa-solid fa-hospital text-sm"></i>
            </div>
            <h1 class="text-lg font-semibold text-slate-800 tracking-tight">Metta Medika <span class="text-slate-400 font-normal">| Admin Panel</span></h1>
          </div>
          
          <button @click="handleLogout" class="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50">
            <i class="fa-solid fa-right-from-bracket"></i>
            Keluar
          </button>
        </div>
      </div>
    </header>

    <!-- Konten Utama -->
    <main class="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Bagian Header & Tombol -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">Rincian Kepuasan Pasien</h2>
          <p class="text-sm text-slate-500 mt-1">Pantau seluruh detail penilaian dari setiap kriteria pelayanan.</p>
        </div>
        
        <!-- Kumpulan Tombol Aksi -->
        <div class="flex gap-3">
          <!-- Tombol Export Excel Baru -->
          <button @click="exportToExcel" :disabled="surveys.length === 0" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all shadow-sm">
            <i class="fa-solid fa-file-excel"></i>
            Export Excel
          </button>

          <button @click="fetchSurveys" class="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg transition-all shadow-sm">
            <i class="fa-solid fa-rotate-right text-slate-500" :class="{'fa-spin': isLoading}"></i>
            Segarkan Data
          </button>
        </div>
      </div>

      <!-- Container Tabel dengan Horizontal Scroll (Sama seperti sebelumnya) -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Nama Pasien</th>
                <th class="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Waktu Terkirim</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Registrasi">REG</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Perawat Poli">PWT</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Dokter Spesialis">DOK</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Verifikator">VER</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Laboratorium">LAB</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Radiologi">RAD</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Farmasi">FAR</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Pelayanan Petugas Kasir">KSR</th>
                <th class="px-3 py-4 text-[10px] font-bold text-blue-600 uppercase tracking-wider text-center cursor-help" title="Kebersihan & Kenyamanan Ruang Tunggu">BRS</th>
                <th class="px-4 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider text-center bg-amber-50/50">Rata-Rata</th>
                <th class="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[250px]">Kritik & Saran</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="isLoading">
                <td colspan="13" class="px-6 py-12 text-center text-slate-500">
                  <i class="fa-solid fa-circle-notch fa-spin text-3xl text-blue-500 mb-3"></i>
                  <p class="text-sm">Menarik data terbaru...</p>
                </td>
              </tr>
              <tr v-else-if="surveys.length === 0">
                <td colspan="13" class="px-6 py-12 text-center">
                  <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fa-solid fa-inbox text-3xl"></i>
                  </div>
                  <p class="text-slate-500 font-medium">Belum ada data survei.</p>
                </td>
              </tr>
              <tr v-else v-for="survey in surveys" :key="survey.id" class="hover:bg-slate-50/80 transition-colors group">
                <td class="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  <div class="text-sm font-bold text-slate-800">{{ survey.nama }}</div>
                </td>
                <td class="px-4 py-3">
                  <div class="text-sm text-slate-600">{{ formatDate(survey.created_at) }}</div>
                  <div class="text-xs text-slate-400 mt-0.5">{{ formatTime(survey.created_at) }}</div>
                </td>
                <td class="px-3 py-3 text-center border-l border-slate-50"><span class="text-sm font-semibold text-slate-700">{{ survey.registrasi }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.perawat }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.dokter }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.verifikator }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.lab }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.radiologi }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.farmasi }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center"><span class="text-sm font-semibold text-slate-700">{{ survey.kasir }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-3 py-3 text-center border-r border-slate-100"><span class="text-sm font-semibold text-slate-700">{{ survey.kebersihan }}</span> <i class="fa-solid fa-star text-amber-400 text-[10px] ml-0.5"></i></td>
                <td class="px-4 py-3 text-center bg-amber-50/30">
                  <span class="inline-flex items-center gap-1 bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded text-sm font-bold text-amber-800">
                    {{ calculateAverage(survey) }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <p class="text-sm text-slate-600 whitespace-normal break-words" :title="survey.saran">
                    {{ survey.saran || '-' }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'

const router = useRouter()
const surveys = ref([])
const isLoading = ref(true)

const fetchSurveys = async () => {
  isLoading.value = true
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) {
    surveys.value = data
  }
  setTimeout(() => { isLoading.value = false }, 400)
}

const calculateAverage = (survey) => {
  const total = survey.registrasi + survey.perawat + survey.dokter + survey.verifikator + 
                survey.lab + survey.radiologi + survey.farmasi + survey.kasir + survey.kebersihan
  return (total / 9).toFixed(1)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' }) + ' WIB'
}

// Fungsi Export ke Excel (Format Rapi Standar Indonesia)
const exportToExcel = () => {
  if (surveys.value.length === 0) return

  const headers = [
    'Tanggal Terkirim',
    'Nama Pasien',
    'Registrasi',
    'Perawat Poli',
    'Dokter Spesialis',
    'Verifikator',
    'Laboratorium',
    'Radiologi',
    'Farmasi',
    'Kasir',
    'Kebersihan Ruang Tunggu',
    'Rata-rata Rating',
    'Kritik & Saran'
  ]

  const separator = ';'
  const csvRows = [headers.join(separator)] 
  
  surveys.value.forEach(survey => {
    const dateTime = `${formatDate(survey.created_at)} ${formatTime(survey.created_at)}`
    const saranBersih = survey.saran ? `"${survey.saran.replace(/"/g, '""').replace(/\n/g, ' ')}"` : '"-"'
    const avgValue = calculateAverage(survey)

    const rowData = [
      `"${dateTime}"`,
      `"${survey.nama}"`,
      survey.registrasi,
      survey.perawat,
      survey.dokter,
      survey.verifikator,
      survey.lab,
      survey.radiologi,
      survey.farmasi,
      survey.kasir,
      survey.kebersihan,
      `"${avgValue}"`,
      saranBersih
    ]
    
    csvRows.push(rowData.join(separator))
  })

  const csvString = '\uFEFF' + csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  
  const today = new Date().toISOString().split('T')[0]
  link.setAttribute('download', `Hasil_Survei_RSMM2_${today}.csv`)
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'Login' })
}

// PENTING: Memanggil fungsi fetch saat halaman pertama kali dibuka
onMounted(() => {
  fetchSurveys()
})
</script>