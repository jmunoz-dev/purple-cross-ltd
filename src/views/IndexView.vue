<script setup>
import { ref } from 'vue'

import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import InputControl from '@/components/controls/InputControl.vue'
import CardElement from '@/components/elements/CardElement.vue'
import { addEmployeeAction } from '@/modules/actions'

const name = ref('')
const occupation = ref('')
const department = ref('')
const dateOfEmployment = ref('')

const nameInput = ref(null)
const occupationInput = ref(null)
const departmentInput = ref(null)
const dateInput = ref(null)

const addEmployee = () => {
  nameInput.value?.validate()
  occupationInput.value?.validate()
  departmentInput.value?.validate()
  dateInput.value?.validate()

  const hasError =
    nameInput.value?.error !== false ||
    occupationInput.value?.error !== false ||
    departmentInput.value?.error !== false ||
    dateInput.value?.error !== false

  if (hasError) return
  addEmployeeAction(name, occupation, department, dateOfEmployment)

  nameInput.value.error = null
  occupationInput.value.error = null
  departmentInput.value.error = null
  dateInput.value.error = null
}
</script>

<template>
  <div class="flex flex-row gap-8 h-fit w-full">
    <CardElement class="bg-white w-1/2">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">Quick Action: Add User</h2>
        <div class="flex flex-wrap w-full justify-between gap-4 sm:gap-4">
          <InputControl
            ref="nameInput"
            v-model="name"
            class="w-1/2"
            type="text"
            name="Name"
            placeholder="John Doe"
            label="Name"
            description="Employee full name"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            ref="occupationInput"
            v-model="occupation"
            class="w-2/5"
            type="text"
            name="Occupation"
            placeholder="Frontend Developer"
            label="Occupation"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            ref="departmentInput"
            v-model="department"
            class="w-2/5"
            type="text"
            name="Department"
            placeholder="Engineering"
            label="Department"
            :validate="[{ type: 'required' }]"
          ></InputControl>

          <InputControl
            ref="dateInput"
            v-model="dateOfEmployment"
            class="w-1/2"
            type="text"
            name="Date of employement"
            placeholder="25/05/2025"
            label="Occupation"
            format="date"
            :validate="[{ type: 'required' }, { type: 'date' }]"
          ></InputControl>
        </div>

        <div>
          <ButtonBlock type="secondary" @button-clicked="addEmployee">Add new employee</ButtonBlock>
        </div>
      </div>
    </CardElement>

    <CardElement class="bg-white w-1/2">
      <h2 class="text-lg font-semibold mb-4">Quick Action: Add User</h2>
    </CardElement>
  </div>
</template>
