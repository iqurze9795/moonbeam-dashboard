import { Component, Vue } from "vue-property-decorator"

@Component
export default class BaseDeleteMixins extends Vue {
  MODULE_NAME = ""

  deleteModel = {
    isShowModal: false,
    content: "Are you sure to detete this item ?",
    title: "Confirm action",
    item: {},
  }

  async onDeleteItem(item) {
    this.deleteModel.isShowModal = true
    this.deleteModel.item = item
  }

  async deleteItem(payload, action = () => {}) {
    await this.$store.dispatch(`${this.MODULE_NAME}/delete`, payload)
    action()
  }
}
