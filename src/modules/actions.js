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

export const exportDataToCSV = (data, columns, filename = 'table_export.csv') => {
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

export const importDataFromCSV = (expectedKeys = [], requiredKeys = []) => {
  const createFileInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    return input
  }

  const parseCSV = (text) => text.split(/\r?\n/).filter((line) => line.trim() !== '')

  const getHeaders = (line) => line.split(',').map((h) => h.trim())

  const parseRow = (line, headers) => {
    const values = line.split(',').map((val) => val.trim().replace(/^"|"$/g, ''))
    return headers.reduce((acc, key, i) => {
      acc[key] = values[i] ?? ''
      return acc
    }, {})
  }

  const validateRequiredFields = (data, requiredKeys) => {
    const errors = []
    data.forEach((row, i) => {
      requiredKeys.forEach((key) => {
        if (!row[key] || row[key].trim() === '') {
          errors.push(`Row ${i + 2}: '${key}' is required.`)
        }
      })
    })
    return errors
  }

  return new Promise((resolve, reject) => {
    const input = createFileInput()

    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return reject('No file selected.')

      const reader = new FileReader()

      reader.onload = () => {
        const lines = parseCSV(reader.result)
        if (lines.length === 0) return reject('CSV file is empty.')

        const headers = getHeaders(lines[0])
        const missingKeys = expectedKeys.filter((k) => !headers.includes(k))
        if (missingKeys.length > 0) {
          return reject(`Missing expected fields: ${missingKeys.join(', ')}`)
        }

        const data = lines.slice(1).map((line) => parseRow(line, headers))
        const errors = validateRequiredFields(data, requiredKeys)
        if (errors.length > 0) return reject(errors)

        resolve(data)
      }

      reader.onerror = () => reject('Error reading file.')
      reader.readAsText(file)
    }

    input.click()
  })
}
