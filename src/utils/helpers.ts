import dayjs from "dayjs"
import _ from "lodash"

export const flow = (fns) => {
  return _.flow([...fns])
}

export const dateFormat = (value, template = "YYYY-MM-DD HH:mm") => {
  const date = dayjs(value)
  if (!date.isValid()) return "-"
  return date.format(template)
}

export const defaultValue = (value, defaultValue = "-") => _.defaultTo(value, defaultValue)
