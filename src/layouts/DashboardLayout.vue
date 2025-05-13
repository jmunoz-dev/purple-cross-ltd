<script setup>
import { ref } from 'vue'
import SidebarElement from '@/components/sections/SidebarSection.vue'
import TopbarElement from '@/components/sections/TopbarSection.vue'
import { useDevice } from '@/composables/useDevice'

const dynamicClass = ref('')
const { isMobile, isTablet } = useDevice()

const handleVisibility = (menuOpen) => {
  if (isMobile.value || isTablet.value) {
    menuOpen ? (dynamicClass.value = 'overflow-hidden blur-sm') : (dynamicClass.value = '')
  }
}
</script>

<template>
  <div class="flex flex-row h-screen w-full flex-grow bg-light text-text">
    <!-- Sidebar -->
    <SidebarElement @toggle-sidebar="handleVisibility" />

    <!-- Main Content -->
    <div :class="dynamicClass" class="flex flex-col w-full h-screen flex-grow relative">
      <!-- Topbar -->
      <TopbarElement />

      <!-- Content Slot -->
      <main class="p-6 overflow-y-auto flex bg-light h-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>
