<script setup>
  import SidebarElement from '@/components/elements/SidebarElement.vue'
  import TopbarElement from '@/components/elements/TopbarElement.vue'
</script>

<template>
  <div class="flex h-dvh bg-light text-text">
    <!-- Sidebar -->
    <SidebarElement />

    <!-- Main Content -->
    <div class="flex-1 flex-col">
      <!-- Topbar -->
      <TopbarElement></TopbarElement>
      <!-- Content Slot -->
      <main class="p-6 overflow-y-auto flex-1 bg-light">
        <slot />
      </main>
    </div>
  </div>
</template>
