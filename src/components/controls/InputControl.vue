<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import ErrorComponent from './partials/ErrorComponent.vue'
import IconBlock from '../blocks/IconBlock.vue'
import { validateData } from '@/modules/validate'
import { format as formatValue } from '@/modules/format'

const props = defineProps({
  type: { type: String, default: 'text' },
  name: { type: String, required: true },
  label: { type: String, default: '' },
  description: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  iconLeft: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
  validate: { type: Array, default: () => [] },
  format: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  validateOnMount: { type: Boolean, default: false },
  validateOnBlur: { type: Boolean, default: true },
  validateOnInput: { type: Boolean, default: false },
})

const modelValue = defineModel({ type: [String, Array, Number], default: '' })
const error = defineModel('error', { type: [Boolean, Array], default: null })

const inputRef = ref(null)
const emit = defineEmits(['click', 'blur', 'icon-left-click', 'input-cleared', 'loaded'])

onMounted(() => {
  if (props.validateOnMount) {
    validateData()
  }
  emit('loaded')
})

const getStateIcon = computed(() => {
  if (error.value === false) {
    return 'mdi:check-circle-outline'
  }
  if (error.value === null) {
    return ''
  }
  return 'mdi:alert-circle-outline'
})

const validate = () => {
  validateData(modelValue, error, props.validate, props.name)
}

watch(modelValue, (newValue) => {
  modelValue.value = formatValue(newValue, [{ [props.format]: true }])
})

const classObject = computed(() => ({
  valid: getStateIcon.value === 'mdi:check-circle-outline',
  error: getStateIcon.value === 'mdi:alert-circle-outline',
}))

const dirty = ref(false)

const onInput = () => {
  dirty.value = true
  if (props.validateOnInput) {
    validate()
  }
}

const onBlur = () => {
  if (props.validateOnBlur && dirty.value === true) {
    validate()
  }
  emit('blur')
}

const clickInput = () => {
  dirty.value = true
  inputRef.value.click()
}

const focusInput = () => {
  inputRef.value.focus()
}

defineExpose({ validate, clickInput, focusInput, inputRef })
</script>

<template>
  <div class="input-component" :class="[classObject]" :hidden @click="clickInput">
    <label v-if="label" :for="name">
      <div class="flex flex-row gap-2">
        <div class="label">{{ label }}</div>
        <span v-if="validate.length > 0 && validate.some((item) => item.type === 'required')">
          *
        </span>
      </div>
      <div v-if="description" class="description">{{ description }}</div>
    </label>
    <div class="input-wrapper">
      <IconBlock
        v-if="iconLeft !== ''"
        :name="iconLeft"
        class="icon-left"
        @click="emit('icon-left-click')"
      />
      <input
        :id="name"
        ref="inputRef"
        v-model="modelValue"
        :disabled="disabled"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        tabindex="0"
        :readonly="props.readonly"
        @input="onInput"
        @blur="onBlur"
        @click="emit('click')"
      />
      <slot name="right-icons">
        <IconBlock v-if="iconRight !== ''" :name="iconRight" class="icon-right" />
      </slot>
      <IconBlock v-if="error !== null" class="state-icon" :name="getStateIcon" />
    </div>
    <slot name="feedback">
      <ErrorComponent class="errors" :errors="error" />
    </slot>
  </div>
</template>

<style lang="scss" src="@/styles/components/input.scss" />
