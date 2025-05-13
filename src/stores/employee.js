import { ref } from 'vue'
import { defineStore } from 'pinia'
import employeesData from '@/configs/employeesData'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const nextId = ref(Math.floor(Math.random() * 100))

    const employees = ref(
      employeesData.map((employee) => ({
        id: nextId.value++,
        ...employee,
      })),
    )

    function addEmployee(employee) {
      employees.value.push({ id: nextId.value++, ...employee })
    }

    function updateEmployee(id, updatedData) {
      const index = employees.value.findIndex((emp) => emp.id === id)
      if (index !== -1) {
        employees.value[index] = { ...employees.value[index], ...updatedData }
      }
    }

    function deleteEmployee(id) {
      employees.value = employees.value.filter((emp) => emp.id !== id)
    }

    return {
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }
  },
  {
    persist: true,
  },
)
