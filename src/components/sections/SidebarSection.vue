<script setup>
import { ref, watch } from 'vue'
import { useDevice } from '@/composables/useDevice'
import IconBlock from '../blocks/IconBlock.vue'

const emit = defineEmits(['toggle-sidebar'])

const { isMobile, isTablet, isDesktop } = useDevice()
const isMenuOpen = ref(!isMobile) // Default to collapsed on mobile

// Watch the device type to update the menu state when screen size changes
watch([isMobile, isTablet, isDesktop], () => {
  // Collapse the menu on mobile and tablet, expand on desktop
  isMenuOpen.value = isDesktop.value ? true : false
})

const toggleSidebar = () => {
  isMenuOpen.value = !isMenuOpen.value
  emit('toggle-sidebar', isMenuOpen.value)
}
</script>

<template>
  <div class="flex z-10">
    <aside
      :class="isMenuOpen ? 'w-64' : 'w-16'"
      class="bg-primary text-white flex flex-col transition-all duration-300 ease-in-out">
      <div
        class="h-16 px-4 py-2 text-xl font-bold border-b border-secondary content-center"
        :class="{ 'self-center': !isMenuOpen }">
        <div class="flex items-center justify-between">
          <div v-if="isMenuOpen">Purple Cross</div>
          <IconBlock
            name="material-symbols:menu-rounded"
            @click="toggleSidebar"
            class="cursor-pointer"
            :class="{ 'p-4': isMenuOpen }"
          />
        </div>
      </div>

      <!-- Navigation section -->
      <nav
        class="flex flex-col pt-4 h-full justify-between"
        :class="isMenuOpen ? 'items-start ' : 'items-center '">
        <div class="navigation-section w-full">
          <RouterLink to="/" class="block w-full rounded hover:bg-secondary transition" :class="isMenuOpen ? 'items-start p-4' : 'items-center px-2 py-4'">
            <div class="flex gap-4" :class="{'justify-center':!isMenuOpen}">
              <IconBlock name="material-symbols:dashboard-rounded" />
              <div v-if="isMenuOpen">Dashboard</div>
            </div>
          </RouterLink>
          <RouterLink to="/employees" class="block w-full rounded hover:bg-secondary transition" :class="isMenuOpen ? 'items-start p-4' : 'items-center px-2 py-4'">
            <div class="flex gap-4" :class="{'justify-center':!isMenuOpen}">
              <IconBlock name="fluent:people-team-20-filled" />
              <div v-if="isMenuOpen">Employees</div>
            </div>
          </RouterLink>
        </div>
        <div class="block w-full rounded hover:bg-secondary transition" :class="isMenuOpen ? 'items-start p-4' : 'items-center px-2 py-4'">
          <div class="flex gap-4" :class="{'justify-center':!isMenuOpen}">
            <IconBlock name="material-symbols:logout-rounded" />
            <div v-if="isMenuOpen">Logout</div>
          </div>
        </div>
      </nav>
    </aside>
  </div>
</template>
