<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  name: { type: String, required: true },
  customIconClass: { type: String, default: 'w-6 h-6' },
})
</script>

<template>
  <div class="icon-component">
    <Icon :icon="name" :class="customIconClass" />
  </div>
</template>
