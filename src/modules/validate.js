export const validateData = (modelValue, error, validate, name) => {
  let validation = {}
  if (validate && validate.length > 0) {
    validation = validateHandler(modelValue.value, validate, name)
    if (validation === true) {
      error.value = false
    } else {
      error.value = validation
        .filter((item) => item.message && item?.result !== true)
        .map((item) => item.message)
    }
  } else {
    error.value = null
  }
}

const validateHandler = (value, validations, name) => {
  if (!Array.isArray(validations)) {
    validations = [validations]
  }

  let validationResult = []
  if (validations.length > 0) {
    validations.forEach((validation) => {
      const validationFunction = moduleValidations[validation.type]
      if (validationFunction) {
        const result = validationFunction(value, name, validation)
        if (Array.isArray(result)) {
          validationResult.push(...result)
        } else {
          validationResult.push(result)
        }
      }
    })

    const failedValidation = validationResult.find((result) => !result.result)

    if (failedValidation) {
      return validationResult
    }

    return true
  }
  return true
}

const validateRequired = (value, name) => {
  if (
    (typeof value === 'string' && value.trim() === '') ||
    value === false ||
    value === null ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return {
      result: false,
      message: `${name} is required.`,
    }
  }

  return { result: true }
}

const validateEmail = (value, name) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/

  if (value && !emailRegex.test(value)) {
    return {
      result: false,
      message: `${name} must be a valid email.`,
    }
  }

  return { result: true }
}

const validateMinLength = (value, name, validation) => {
  const min = validation.min
  if (value.length < min) {
    const paddedValue = value.padEnd(min, ' ')
    return {
      result: false,
      value: paddedValue,
      message: `${name} must be at least ${min} characters.`,
    }
  }

  return { result: true, value }
}

const validateMaxLength = (value, name, validation) => {
  const max = validation.max
  if (value.length > max) {
    return {
      result: false,
      value: value,
      message: `${name} must be at most ${max} characters.`,
    }
  }

  return { result: true }
}

const validateLetters = (value, name) => {
  if (value && !value.match(/^[a-zA-Z\s]+$/)) {
    return {
      result: false,
      value: value,
      message: `${name} must contain only letters.`,
    }
  }

  return { result: true }
}

const validateDate = (value, name) => {
  if (value && !value.match(/^[0-9/]+$/)) {
    return {
      result: false,
      value: value,
      message: `${name} must contain only numbers.`,
    }
  }

  return { result: true }
}

const moduleValidations = {
  required: validateRequired,
  email: validateEmail,
  minLength: validateMinLength,
  maxLength: validateMaxLength,
  letters: validateLetters,
  date: validateDate,
}
