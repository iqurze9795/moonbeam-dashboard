import { Component, Mixins } from "vue-property-decorator"
import { isEmpty } from "lodash"
import { Getter } from "vuex-class"
import get from "lodash/get"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import BaseDeleteMixins from "@/mixins/baseDelete"

@Component
export default class BaseFormMixins extends Mixins(BaseDeleteMixins) {
  MODULE_NAME
  schema
  formModel = {}
  detail

  @Getter("service/isLoading")
  private IS_LOADING

  get payload() {
    const [startDate, endDate] = get(this.formModel, "dateRange", ["", ""])
    let initial = {}
    if (startDate && endDate) {
      initial = { ...initial, startDate, endDate }
    } else {
      initial = { ...initial, startDate: null, endDate: null }
    }
    const payload = Object.keys(this.schema).reduce(
      (model, key) => {
        if (this.schema[key].type === "fileUpload") {
          if (!isEmpty(this.formModel[key].url)) {
            return { ...model, [`${key}_url`]: this.formModel[key].url }
          } else {
            return { ...model, [`${key}_url`]: null }
          }
        } else if (this.schema[key].type === "products") {
          const product = isEmpty(this.formModel[key]) ? [] : this.formModel[key]
          return {
            ...model,
            [key]: product,
          }
        } else if (this.schema[key].type === "checkbox") {
          const value = this.formModel[key] === "" ? false : this.formModel[key]
          return { ...model, [key]: value }
        }
        else if (
          !isEmpty(this.schema[key]) &&
          this.schema[key].type === "text" &&
          this.schema[key].attribute &&
          this.schema[key].attribute.type === "number"
        ) {
          return { ...model, [key]: parseInt(this.formModel[key]) }
        } else if (!isEmpty(this.formModel[key])) {
          return { ...model, [key]: this.formModel[key] }
        } else {
          return { ...model, [key]: null }
        }
      },
      { status: "unpublished", ...initial }
    )

    delete payload["dateRange"]
    return payload
  }

  get id() {
    return this.$store.getters[`${this.MODULE_NAME}/id`]
  }

  get item() {
    if (!this.$route.params.id) return {}
    return this.$store.getters[`${this.MODULE_NAME}/item`]
  }

  get error() {
    return this.$store.getters[`${this.MODULE_NAME}/error`]
  }

  get isLoading() {
    return this.IS_LOADING(`${this.MODULE_NAME}/create`) || this.IS_LOADING(`${this.MODULE_NAME}/edit`)
  }

  get fullName() {
    return [get(this.item, "updated_by.firstname"), get(this.item, "updated_by.lastname")]
      .filter(Boolean)
      .join(" ")
      .replace(/^\s$/g, "-")
  }

  get updatedAt() {
    dayjs.extend(relativeTime)
    const updatedAt = get(this.item, "updatedAt")
    return updatedAt ? dayjs(updatedAt).fromNow() : "-"
  }

  get badge() {
    const status = get(this.item, ["status"], "")
    return {
      label: status === "published" ? "Published" : "Draft version",
      variant: status === "published" ? "success" : "warning",
    }
  }

  get info() {
    return [
      {
        label: "Last update",
        value: this.updatedAt,
        type: "text",
      },
      {
        label: "By",
        value: this.fullName,
        type: "text",
      },
      {
        label: "Status",
        value: this.badge.label,
        type: "badge",
        variant: this.badge.variant,
      },
    ]
  }

  get actions() {
    const deleteAction = {
      label: "Delete this entry",
      onClick: () => {
        this.deleteModel = {
          ...this.deleteModel,
          isShowModal: true,
        }
      },
    }

    if (this.$route.params.id) {
      return [deleteAction]
    }
    return []
  }
  get isCreateMode() {
    return isEmpty(this.$route.params.id)
  }

  async onRemove() {
    const id = get(this.item, "id", "")
    await this.deleteItem(
      {
        id,
      },
      () => {
        this.$router.push({ name: `${this.MODULE_NAME}-list` })
      }
    )
  }

  get updateDataLoading() {
    return this.IS_LOADING(`${this.MODULE_NAME}/updateData`)
  }
  get updateStatusLoading() {
    return this.IS_LOADING(`${this.MODULE_NAME}/updateStatus`)
  }

  async create(payload) {
    return await this.$store.dispatch(`${this.MODULE_NAME}/create`, payload)
  }

  async update(payload) {
    return await this.$store.dispatch(`${this.MODULE_NAME}/update`, payload)
  }

  async find(payload) {
    return await this.$store.dispatch(`${this.MODULE_NAME}/find`, payload)
  }

  async onSave() {
    if (this.$route.params.id) {
      await this.update({
        id: this.$route.params.id,
        item: { ...this.payload, status: "unpublished" },
        caller: "updateData",
      })
    } else {
      await this.create({ payload: { ...this.payload, status: "unpublished" } })
    }

    if (!isEmpty(this.error)) {
      this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          title: `Error`,
          icon: "CoffeeIcon",
          variant: "danger",
          text: `Update data error, Message is ${this.error.message}`,
        },
      })
    } else {
      this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          title: `Successfully`,
          icon: "CoffeeIcon",
          variant: "success",
          text: `Save data success.🍺`,
        },
      })

      const id = this.$route.params.id || this.id
      await this.find({ id })
      await this.$router.push({
        name: `${this.MODULE_NAME}-edit`,
        params: { id },
      })
    }
  }

  buildForm() {
    return Object.keys(this.schema).reduce((model, key) => {
      if (this.schema[key].type === "fileUpload") {
        return {
          ...model,
          [key]: {
            url: "",
          },
        }
      } else if (this.schema[key].type === "content") {
        return {
          ...model,
          [key]: [],
        }
      } else {
        return {
          ...model,
          [key]: "",
        }
      }
    }, {})
  }

  setDefaultValue() {
    return Object.keys(this.formModel).reduce(
      (model, key) => {
        if (this.schema[key].type === "fileUpload") {
          return {
            ...model,
            [key]: {
              url: get(this.item, `${key}Url`, ""),
            },
          }
        } else if (this.schema[key].type === "content") {
          return {
            ...model,
            [key]: get(this.item, `contents`, []) || [],
          }
        } else {
          return {
            ...model,
            [key]: get(this.item, key, ""),
          }
        }
      },
      { status: get(this.item, "status") }
    )
  }

  async onAction() {
    const status = get(this.item, ["status"], "")
    const payload: { status: string } = {
      status: "",
    }
    if (status === "published") {
      // payload = { status: "drafted", publishedAt: null }
      payload.status = "unpublished"
      // payload.publishDate = null
    } else {
      payload.status = "published"
      // payload.publishDate = new Date()
    }

    await this.update({
      id: this.$route.params.id,
      item: payload,
      caller: "updateStatus",
    })

    this.$toast({
      component: ToastificationContent,
      position: "top-right",
      props: {
        title: `Successfully`,
        icon: "CoffeeIcon",
        variant: "success",
        text: `Update status success.🍺`,
      },
    })
    this.$router.push({
      name: `${this.MODULE_NAME}-list`
    })

    await this.find({ id: this.$route.params.id })
  }

  async created(): Promise<void> {
    this.MODULE_NAME = ""
    this.formModel = this.buildForm()
  }

  async mounted() {
    const id = this.$route.params.id
    if (id) {
      await this.find({ id })
      this.formModel = this.setDefaultValue()
    }
  }
}
