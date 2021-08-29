import FeatherIcon from "@core/components/feather-icon/FeatherIcon.vue"
import {
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCardHeader,
  BCardText,
  BCol,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownHeader,
  BDropdownItem,
  BDropdownText,
  BForm,
  BFormCheckbox,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormTimepicker,
  BImg,
  BInputGroup,
  BLink,
  BModal,
  BOverlay,
  BPagination,
  BRow,
  BSidebar,
  BTable,
} from "bootstrap-vue"
import Vue from "vue"

import VSwatches from "vue-swatches"
import "vue-swatches/dist/vue-swatches.css"

Vue.component(FeatherIcon.name, FeatherIcon)

Vue.component("b-button", BButton)
Vue.component("b-card", BCard)
Vue.component("b-card-body", BCardBody)
Vue.component("b-form-checkbox", BFormCheckbox)
Vue.component("b-dropdown", BDropdown)
Vue.component("b-dropdown-text", BDropdownText)
Vue.component("b-dropdown-form", BDropdownForm)
Vue.component("b-dropdown-divider", BDropdownDivider)
Vue.component("b-dropdown-header", BDropdownHeader)
Vue.component("b-dropdown-item", BDropdownItem)
Vue.component("b-img", BImg)
Vue.component("b-link", BLink)
Vue.component("b-row", BRow)
Vue.component("b-col", BCol)
Vue.component("b-table", BTable)
Vue.component("b-pagination", BPagination)
Vue.component("b-badge", BBadge)
Vue.component("b-card-text", BCardText)
Vue.component("b-form", BForm)
Vue.component("b-form-datepicker", BFormDatepicker)
Vue.component("b-form-group", BFormGroup)
Vue.component("b-form-input", BFormInput)
Vue.component("b-form-textarea", BFormTextarea)
Vue.component("b-form-timepicker", BFormTimepicker)
Vue.component("b-overlay", BOverlay)
Vue.component("b-modal", BModal)
Vue.component("b-card-header", BCardHeader)
Vue.component("b-sidebar", BSidebar)
Vue.component("b-input-group", BInputGroup)

Vue.use(VSwatches)
