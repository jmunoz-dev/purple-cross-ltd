export const format = (value, appliedFormattings) => {
  if (!Array.isArray(appliedFormattings)) {
    appliedFormattings = [appliedFormattings]
  }

  let formattingResult

  appliedFormattings.find((formatting) => {
    const formattingFunction = formattingsMap[Object.keys(formatting)[0]]
    if (formattingFunction) {
      formattingResult = formattingFunction(value)
    } else {
      formattingResult = value
    }
  })

  return formattingResult
}

const formatDate = (value) => {
  if (!value) return ''

  const normalized = value
    .toString()
    .replace(/[^\d/-]/g, '') // only numbers, / or -
    .replace(/\//g, '-') // convert  / into -

  const cleaned = normalized.replace(/-/g, '').slice(0, 8)

  const hasDashAfterYear = normalized[4] === '-' && normalized.length === 5
  const hasDashAfterMonth = normalized[7] === '-' && normalized.length === 8

  const year = cleaned.slice(0, 4)
  let month = cleaned.slice(4, 6)
  let day = cleaned.slice(6, 8)

  if (month && parseInt(month) > 12) month = '12'
  if (day && parseInt(day) > 31) day = '31'

  if (hasDashAfterYear) return `${year}-`
  if (hasDashAfterMonth) return `${year}-${month}-`

  return [year, month, day].filter(Boolean).join('-')
}

const formattingsMap = {
  date: formatDate,
}
