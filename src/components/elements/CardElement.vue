<script setup>
defineProps({
  type: { type: String, default: '' }
})
</script>

<template>
  <div class="card-component">
    <div class="card-elements" :class="type">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" src="#scss/components/card.scss" />
