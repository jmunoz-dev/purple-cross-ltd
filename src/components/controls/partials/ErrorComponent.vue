<script setup>
defineProps({
  errors: { type: [String, Array, Boolean], default: false },
  translate: { type: Boolean, default: false },
})
</script>

<template>
  <div class="error-component">
    <div class="text-xs text-functional-danger">
      <div v-if="Array.isArray(errors)" class="flex flex-col gap-2 min-h-4">
        <span v-for="(error, index) in errors" :key="index">
          {{ error ? error : '' }}
        </span>
      </div>
      <span v-else class="block min-h-4">
        {{ errors ? errors : '' }}
      </span>
    </div>
  </div>
</template>
