<script setup>
import { ref } from 'vue'
import InputControl from '@/components/controls/InputControl.vue'
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import { addEmployeeAction } from '@/modules/actions'

const emit = defineEmits(['employee-created'])

const isSubmitting = ref(false)
const today = new Date().toISOString().split('T')[0]

const name = ref('')
const occupation = ref('')
const department = ref('')
const dateOfEmployment = ref('')

const nameInput = ref(null)
const occupationInput = ref(null)
const departmentInput = ref(null)
const dateInput = ref(null)

const addEmployee = async () => {
  isSubmitting.value = true
  nameInput.value?.validate()
  occupationInput.value?.validate()
  departmentInput.value?.validate()
  dateInput.value?.validate()

  const hasError =
    nameInput.value?.error !== false ||
    occupationInput.value?.error !== false ||
    departmentInput.value?.error !== false ||
    dateInput.value?.error !== false

  if (hasError) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    isSubmitting.value = false
    return
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))
  addEmployeeAction(name, occupation, department, dateOfEmployment)

  nameInput.value.error = null
  occupationInput.value.error = null
  departmentInput.value.error = null
  dateInput.value.error = null
  isSubmitting.value = false
  emit('employee-created')
}
</script>

<template>
  <div class="flex flex-wrap w-full justify-between gap-4 sm:gap-4">
    <InputControl
      ref="nameInput"
      v-model="name"
      class="flex-grow-[4]"
      type="text"
      name="Name"
      placeholder="John Doe"
      label="Name"
      description="Employee full name"
      :validate="[{ type: 'required' }]"
    />
    <InputControl
      ref="occupationInput"
      v-model="occupation"
      class="flex-grow"
      type="text"
      name="Occupation"
      placeholder="Frontend Developer"
      label="Occupation"
      :validate="[{ type: 'required' }]"
    />
    <InputControl
      ref="departmentInput"
      v-model="department"
      class="flex-grow-[4]"
      type="text"
      name="Department"
      placeholder="Engineering"
      label="Department"
      :validate="[{ type: 'required' }]"
    />
    <InputControl
      ref="dateInput"
      v-model="dateOfEmployment"
      class="flex-grow"
      type="text"
      name="Date of employment"
      :placeholder="today"
      label="Date of employment"
      format="date"
      :validate="[{ type: 'date' }]"
    />

    <div class="w-full mt-2">
      <ButtonBlock type="secondary" @button-clicked="addEmployee" :disabled="isSubmitting">
        Add new employee
      </ButtonBlock>
    </div>
  </div>
</template>
