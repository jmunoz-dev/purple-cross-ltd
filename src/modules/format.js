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
  const cleaned = value.toString().replace(/\D/g, '')
  const trimmed = cleaned.slice(0, 8)
  const matched = trimmed.match(/.{1,2}/g)
  if (matched && matched.length === 4) {
    const year = matched.splice(-2)
    matched.push(year.join(''))
  }
  return matched ? matched.join('/') : ''
}

const formattingsMap = {
  date: formatDate,
}
