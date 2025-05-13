<script setup>
import IconBlock from '../blocks/IconBlock.vue'

defineProps({
  show: { type: Boolean, default: false },
  close: { type: Boolean, default: true },
  type: { type: String, default: '' },
})

defineEmits(['close-modal-trigger'])
</script>

<template>
  <transition name="modal">
    <div v-show="show" :class="['modal-component', { open: show }]">
      <div class="modal-body" :class="type">
        <div class="modal-header">
          <div v-if="close" class="modal-close-icon" @click="$emit('close-modal-trigger')">
            <IconBlock name="material-symbols:close" />
          </div>
          <slot name="header"></slot>
        </div>
        <div class="modal-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="@/styles/components/modal.scss" />
