<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEmployeeStore } from '@/stores/employee'

import { useRoute, useRouter } from 'vue-router'
import InputControl from '@/components/controls/InputControl.vue'
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import IconBlock from '@/components/blocks/IconBlock.vue'

const storeEmployee = useEmployeeStore()
const route = useRoute()
const router = useRouter()

const employeeId = route.params.id
const isEditing = computed(() => storeEmployee.isEditing)
const employee = ref(storeEmployee.getEmployeeById(employeeId))

const name = ref('')
const occupation = ref('')
const department = ref('')
const dateOfEmployment = ref('')
const terminationDate = ref('')

const nameInput = ref(null)
const occupationInput = ref(null)
const departmentInput = ref(null)
const dateOfEmploymentInput = ref(null)
const terminationDateInput = ref(null)
const isSaving = ref(false)

onMounted(() => {
  if (!employee.value) {
    employee.value = storeEmployee.getEmployeeById(employeeId)
  }

  if (employee.value) {
    name.value = employee.value.fullName
    occupation.value = employee.value.occupation
    department.value = employee.value.department
    dateOfEmployment.value = employee.value.dateOfEmployment
    terminationDate.value = employee.value.terminationDate || ''
  }
})

const saveEmployee = async () => {
  if (!employee.value) return
  isSaving.value = true
  const updatedEmployee = {
    ...employee.value,
    fullName: name.value,
    occupation: occupation.value,
    department: department.value,
    dateOfEmployment: dateOfEmployment.value,
    terminationDate: terminationDate.value || null,
  }

  await new Promise((resolve) => setTimeout(resolve, 800))
  storeEmployee.updateEmployee(employeeId, updatedEmployee)
  isSaving.value = false
}

const cancelEdit = () => {
  router.back()
}
</script>

<template>
  <div class="flex flex-col flex-grow gap-6">
    <h2 class="text-xl font-bold">{{ isEditing ? 'Edit Employee' : 'Employee Details' }}</h2>
    <!-- Employee form data -->
    <form v-if="employee">
      <div class="mb-4">
        <InputControl
          name="Full name"
          ref="nameInput"
          v-model="name"
          :disabled="!isEditing"
          label="Full Name"
          placeholder="Enter full name"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <InputControl
          name="Occupation"
          ref="occupationInput"
          v-model="occupation"
          :disabled="!isEditing"
          label="Occupation"
          placeholder="Enter occupation"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <InputControl
          name="Department"
          ref="departmentInput"
          v-model="department"
          :disabled="!isEditing"
          label="Department"
          placeholder="Enter department"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <InputControl
          name="Date of Employment"
          ref="dateOfEmploymentInput"
          v-model="dateOfEmployment"
          :disabled="!isEditing"
          label="Date of Employment"
          type="date"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <InputControl
          name="Termination Date"
          ref="terminationDateInput"
          v-model="terminationDate"
          :disabled="!isEditing"
          label="Termination Date"
          type="date"
          class="w-full"
        />
      </div>

      <div class="mt-4 flex justify-end gap-4">
        <ButtonBlock @click="cancelEdit" type="secondary" :disabled="isSaving">
          {{ isEditing ? 'Cancel' : 'Go Back' }}
        </ButtonBlock>
        <ButtonBlock v-if="isEditing" @click="saveEmployee" type="secondary" :disabled="isSaving">
          <div class="flex items-center gap-2">
            <span>{{ isSaving ? 'Saving...' : 'Save' }}</span>
            <IconBlock v-if="isSaving" name="svg-spinners:180-ring-with-bg" class="animate-spin" />
            <IconBlock v-else name="mdi:content-save-edit" />
          </div>
        </ButtonBlock>
      </div>
    </form>
  </div>
</template>
