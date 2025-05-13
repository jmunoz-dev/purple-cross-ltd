<script setup>
import TableElement from '@/components/elements/TableElement.vue'
import { useEmployeeStore } from '@/stores/employee'
const columns = [
  { key: 'fullName', label: 'Name', sortable: true },
  { key: 'occupation', label: 'Occupation', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'dateOfEmployment', label: 'Employment', sortable: true },
  { key: 'terminationDate', label: 'Termination', sortable: true },
]

const handleEdit = (id) => {
  console.log('Edit employee with id:', id)
}

const handleDelete = (id) => {
  console.log('Delete employee with id:', id)
}
const storeEmployee = useEmployeeStore()
</script>

<template>
  <div class="w-full">
    <TableElement
      :data="storeEmployee.employees"
      :columns="columns"
      :perPage="5"
      @edit="handleEdit"
      @delete="handleDelete"
    ></TableElement>
  </div>
</template>
