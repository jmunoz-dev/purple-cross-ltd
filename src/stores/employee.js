import { ref } from 'vue'
import { defineStore } from 'pinia'
import employeesData from '@/configs/employeesData'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const employees = ref([...employeesData])

    function generateId() {
      return Date.now().toString() + Math.random().toString(36).substring(2, 5)
    }

    function addEmployee(employee) {
      employees.value.push({ id: generateId(), ...employee })
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
