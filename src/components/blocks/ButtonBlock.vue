<script setup>
defineProps({
  type: { type: String, default: 'primary' },
  link: { type: String, default: null },
  params: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['button-clicked'])

function onNonLinkClick(event) {
  emit('button-clicked', event)
}
</script>

<template>
  <div class="button-component" :class="[type, { disabled: disabled, loading: loading }]">
    <router-link v-if="link" :to="{ name: link, params: params }" class="button">
      <slot></slot>
    </router-link>
    <button
      v-else
      type="button"
      class="button"
      @click="onNonLinkClick($event)"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style lang="scss" src="@/styles/components/button.scss" />
