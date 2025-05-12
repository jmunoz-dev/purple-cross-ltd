<script setup>
import { ref } from 'vue'
import SidebarElement from '@/components/elements/SidebarElement.vue'
import TopbarElement from '@/components/elements/TopbarElement.vue'
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
  <div class="flex h-dvh bg-light text-text">
    <!-- Sidebar -->
    <SidebarElement @toggle-sidebar="handleVisibility" />
    <!-- Main Content -->
    <div :class="dynamicClass" class="flex-1 flex-col">
      <!-- Topbar -->
      <TopbarElement />
      <!-- Content Slot -->
      <main class="p-6 overflow-y-auto flex-1 bg-light">
        <slot />
      </main>
    </div>
  </div>
</template>
