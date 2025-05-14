<script setup>
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import IconBlock from '@/components/blocks/IconBlock.vue'
import ModalElement from '@/components/elements/ModalElement.vue'
import TableElement from '@/components/elements/TableElement.vue'
import EmployeeForm from '@/components/forms/EmployeeForm.vue'
import { getEmploymentStatus, getTerminationStatus } from '@/modules/actions'
import router from '@/router'
import { useEmployeeStore } from '@/stores/employee'
import { computed, ref } from 'vue'

const storeEmployee = useEmployeeStore()
const showConfirmationModal = ref(false)
const showCreateModal = ref(false)
const selectedId = ref()
const loadingButton = ref(false)

const columns = [
  { key: 'fullName', label: 'Name', sortable: true },
  { key: 'occupation', label: 'Occupation', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'dateOfEmployment', label: 'Employment', sortable: true },
  { key: 'terminationDate', label: 'Termination', sortable: true },
]

const tableData = computed(() =>
  storeEmployee.employees.map((employee) => ({
    ...employee,
    dateOfEmployment: getEmploymentStatus(employee.dateOfEmployment),
    terminationDate: getTerminationStatus(employee.terminationDate),
  })),
)

const handleView = (id) => {
  storeEmployee.isEditing = false
  router.push(`/employee/${id}`)
}

const handleEdit = (id) => {
  storeEmployee.isEditing = true
  router.push(`/employee/${id}`)
}

const handleDelete = (id) => {
  showConfirmationModal.value = true
  selectedId.value = id
  console.log('Delete employee with id:', id)
}

const deleteData = async () => {
  loadingButton.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  storeEmployee.deleteEmployee(selectedId.value)
  showConfirmationModal.value = false
  loadingButton.value = false
}
</script>

<template>
  <div class="flex flex-nowrap flex-col gap-8 h-fit w-full">
    <div class="w-full">
      <TableElement
        :key="storeEmployee.employees"
        :data="tableData"
        :columns="columns"
        :perPage="5"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      ></TableElement>
    </div>

    <div class="flex w-full justify-end">
      <ButtonBlock @button-clicked="showCreateModal = !showCreateModal">
        <div class="flex gap-2">
          Add new employee
          <IconBlock name="ri:user-add-line"></IconBlock>
        </div>
      </ButtonBlock>
    </div>
  </div>

  <!-- Delete confirmation modal -->
  <ModalElement
    :show="showConfirmationModal"
    @close-modal-trigger="showConfirmationModal = !showConfirmationModal"
  >
    <template #content>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col text-center gap-6">
          <h2 class="text-lg font-semibold">Delete employee</h2>
          <div>Are you sure to continue?</div>
        </div>
        <div class="flex justify-between gap-6">
          <ButtonBlock
            class="w-1/2"
            type="secondary"
            :disabled="loadingButton"
            @button-clicked="showConfirmationModal = !showConfirmationModal"
          >
            Cancel
          </ButtonBlock>
          <ButtonBlock
            class="w-1/2"
            type="danger"
            :disabled="loadingButton"
            @button-clicked="deleteData"
          >
            Delete Employee
          </ButtonBlock>
        </div>
      </div>
    </template>
  </ModalElement>

  <!-- Create new employee modal -->
  <ModalElement :show="showCreateModal" @close-modal-trigger="showCreateModal = !showCreateModal">
    <template #header>
      <h2 class="text-lg font-semibold mb-4">New Employee Data</h2>
    </template>
    <template #content>
      <EmployeeForm @employee-created="showCreateModal = !showCreateModal" />
    </template>
  </ModalElement>
</template>
