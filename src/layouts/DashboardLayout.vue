<script setup>
import { ref } from 'vue'
import SidebarElement from '@/components/sections/SidebarSection.vue'
import TopbarElement from '@/components/sections/TopbarSection.vue'
import { useDevice } from '@/composables/useDevice'

const dynamicClass = ref('')
const { isMobile, isTablet } = useDevice()

const handleVisibility = (menuOpen) => {
  if (isMobile.value || isTablet.value) {
    menuOpen
      ? (dynamicClass.value = 'overflow-hidden blur-sm pointer-events-none')
      : (dynamicClass.value = '')
  }
}
</script>

<template>
  <div class="flex flex-row h-screen w-full flex-grow bg-light text-text">
    <!-- Sidebar -->
    <SidebarElement @toggle-sidebar="handleVisibility" />

    <!-- Main Content -->
    <div :class="dynamicClass" class="w-full overflow-x-hidden">
      <!-- Topbar -->
      <TopbarElement />

      <!-- Content Slot -->
      <main :class="dynamicClass" class="p-6 flex bg-light flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>
