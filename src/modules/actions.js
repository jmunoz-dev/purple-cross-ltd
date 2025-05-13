import { useEmployeeStore } from '@/stores/employee'

export const addEmployeeAction = (name, occupation, department, dateOfEmployment) => {
  const employeeStore = useEmployeeStore()

  employeeStore.addEmployee({
    name: name.value,
    occupation: occupation.value,
    department: department.value,
    dateOfEmployment: dateOfEmployment.value,
  })

  name.value = ''
  occupation.value = ''
  department.value = ''
  dateOfEmployment.value = ''
}
