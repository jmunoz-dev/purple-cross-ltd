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

export function exportDataToCSV(data, columns, filename = 'table_export.csv') {
  const rows = [columns.map((col) => col.label)]

  data.forEach((entry) => {
    rows.push(
      columns.map((col) => {
        const val = entry[col.key]
        if (typeof val === 'string') {
          return `"${val.replace(/"/g, '""')}"`
        } else if (val != null) {
          return val
        } else {
          return ''
        }
      }),
    )
  })

  const csvContent = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
