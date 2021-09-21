import dayjs from "dayjs"
import _ from "lodash"
import BigNumber from 'bignumber.js'
export const flow = (fns) => {
  return _.flow([...fns])
}

export const dateFormat = (value, template = "YYYY-MM-DD HH:mm") => {
  const date = dayjs(value)
  if (!date.isValid()) return "-"
  return date.format(template)
}

export const defaultValue = (value, defaultValue = "-") => _.defaultTo(value, defaultValue)

export const convertToHumanUnit = (value: number, digit: number,decimal) => {
  const div = value / (Math.pow(10, digit))
  return new BigNumber(div).toFormat(decimal)
}

export const bigNumber = (value) => {
  return new BigNumber(value).toFormat(2)
}

export const percentChange = (pre, current) => {
  const percent = (current - pre) * 100 / current
  return new BigNumber(percent).toFormat(2)
}