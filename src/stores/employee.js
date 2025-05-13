import { ref } from 'vue'
import { defineStore } from 'pinia'
import employeesData from '@/configs/employeesData'

export const useEmployeeStore = defineStore(
  'employee',
  () => {
    const isEditing = ref(false)

    const nextId = ref(Math.floor(Math.random() * 100))
    const employees = ref(
      employeesData.map((employee) => ({
        id: nextId.value++,
        ...employee,
      })),
    )

    const addEmployee = (employee) => {
      employees.value.push({ id: nextId.value++, ...employee })
    }

    const updateEmployee = (id, updatedData) => {
      const index = employees.value.findIndex((emp) => emp.id === Number(id))
      if (index !== -1) {
        employees.value[index] = { ...employees.value[index], ...updatedData }
      }
    }

    const deleteEmployee = (id) => {
      employees.value = employees.value.filter((emp) => emp.id !== Number(id))
    }

    const getEmployeeById = (id) => {
      return employees.value.find((employee) => employee.id === Number(id))
    }

    return {
      isEditing,
      employees,
      getEmployeeById,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }
  },
  {
    persist: true,
  },
)
