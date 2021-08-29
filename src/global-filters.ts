import dayjs from "dayjs"
import Vue from "vue"

Vue.filter("number", (value) => {
  return new Intl.NumberFormat("en-US").format(value)
})
Vue.filter("min", (value, minimum) => {
  return Math.min(value, minimum)
})
Vue.filter("dateFormat", (value, template = "YYYY-MM-DD HH:mm") => {
  const date = dayjs(value)
  if (!date.isValid()) return "-"
  return date.format(template)
})
