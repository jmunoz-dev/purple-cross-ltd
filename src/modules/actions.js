import { useEmployeeStore } from '@/stores/employee'

export const addEmployeeAction = (name, occupation, department, dateOfEmployment) => {
  const employeeStore = useEmployeeStore()

  employeeStore.addEmployee({
    fullName: name.value,
    occupation: occupation.value,
    department: department.value,
    dateOfEmployment: dateOfEmployment.value,
  })

  name.value = ''
  occupation.value = ''
  department.value = ''
  dateOfEmployment.value = ''
}

export const getEmploymentStatus = (date) => {
  if (!date) return ''
  const now = new Date()
  const employmentDate = new Date(date)

  return employmentDate > now ? `Employed soon: ${date}` : `Currently employed: ${date}`
}

export const getTerminationStatus = (date) => {
  if (!date) return ''
  const now = new Date()
  const terminationDate = new Date(date)

  return terminationDate > now ? `To be terminated: ${date}` : `Terminated: ${date}`
}
