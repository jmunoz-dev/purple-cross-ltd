<script setup>
import ButtonBlock from '@/components/blocks/ButtonBlock.vue'
import IconBlock from '@/components/blocks/IconBlock.vue'
import TableElement from '@/components/elements/TableElement.vue'
import router from '@/router'
import { useEmployeeStore } from '@/stores/employee'

const storeEmployee = useEmployeeStore()

const columns = [
  { key: 'fullName', label: 'Name', sortable: true },
  { key: 'occupation', label: 'Occupation', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'dateOfEmployment', label: 'Employment', sortable: true },
  { key: 'terminationDate', label: 'Termination', sortable: true },
]

const handleView = (id) => {
  console.log('Visit employee with id:', id)
  router.push(`/employee/${id}`)
}

const handleEdit = (id) => {
  console.log('Edit employee with id:', id)
  storeEmployee.isEditing = true
  router.push(`/employee/${id}`)
}

const handleDelete = (id) => {
  console.log('Delete employee with id:', id)
}
</script>

<template>
  <div class="w-full flex flex-col justify-between">
    <TableElement
      :data="storeEmployee.employees"
      :columns="columns"
      :perPage="5"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    ></TableElement>

    <div class="flex justify-end">
      <ButtonBlock>
        <div class="flex gap-2">
          Add new employee
          <IconBlock name="ri:user-add-line"></IconBlock>
        </div>
      </ButtonBlock>
    </div>
  </div>
</template>
