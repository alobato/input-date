
import React, { memo, useState, useEffect } from 'react'

import Input from '@alobato/input'

const maskValue = (value = '') => {
  value = value.toString()
  value = value.replace(/\D/g, '')

  if (!value) return ''

  if (value.length === 1 && /\d/.test(value)) return `${value}`
  if (value.length === 2 && /\d{2}/.test(value)) return `${value}`
  if (value.length === 3 && /\d{3}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 1)}`
  if (value.length === 4 && /\d{4}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 2)}`
  if (value.length === 5 && /\d{5}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 2)}/${value.substr(4, 1)}`
  if (value.length === 6 && /\d{6}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 2)}/${value.substr(4, 2)}`
  if (value.length === 7 && /\d{7}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 2)}/${value.substr(4, 3)}`
  if (value.length === 8 && /\d{8}/.test(value)) return `${value.substr(0, 2)}/${value.substr(2, 2)}/${value.substr(4, 4)}`

  return value
}

const unmaskValue = (maskedValue = '') => {
  if (!maskedValue) return ''
  let arrayDate = ['', '', '']
  if (maskedValue.length === 10) {
    arrayDate = maskedValue.split('/')
    return `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
  } else {
    return ''
  }

}

const initialMaskedValue = ''

export default memo(({ onChange = () => {}, value, defaultValue, ...rest }) => {

  const [maskedValue, setMaskedValue] = useState(initialMaskedValue)

  useEffect(
    () => {
      let param = value || defaultValue
      if (param && (param.length === 8 || param.length === 10)) {
        param = param.replace(/\D/g, '')
        param = `${param.substr(6, 2)}${param.substr(4, 2)}${param.substr(0, 4)}`
      }
      setMaskedValue(maskValue(param))
    },
    [defaultValue, value]
  )

  const handleChange = event => {
    const { target } = event
    const { value: inputValue = 0 } = target

    const value = unmaskValue(inputValue)
    const maskedValue = maskValue(inputValue)

    setMaskedValue(maskedValue)

    if (!onChange || typeof onChange !== 'function') return false
    return onChange(event, value, maskedValue)
  }

  return (
    <Input type='tel' maxLength={10} value={maskedValue} onChange={handleChange} {...rest} />
  )

})
