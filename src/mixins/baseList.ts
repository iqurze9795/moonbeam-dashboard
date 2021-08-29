import { get } from "lodash"
import { flow, dateFormat } from "@/utils/helpers"
import { Getter } from "vuex-class"
import { Component, Mixins } from "vue-property-decorator"
import BaseDelete from "@/mixins/baseDelete"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"

@Component
export class BaseListMixins extends Mixins(BaseDelete) {
  MODULE_NAME = "name"
  PREFIX_PATH = ""
  currentPage = 1
  rows = 200
  perPage = 10
  perPageOptions = [10, 25, 50, 100]
  columns: any[] = []
  selectedItems: any[] = []
  needToFetchActiveItem = false

  @Getter("service/isLoading")
  IS_LOADING

  get dataObject() {
    return this.$store.getters[`${this.MODULE_NAME}/list`]
  }

  get dataActiveObject() {
    return this.$store.getters[`${this.MODULE_NAME}/activeItems`]
  }

  get tableColumns() {
    const cols = this.columns.reduce<{ key }[]>(
      (cols, { checked, key, ...attr }) => (checked ? [...cols, { key, ...attr }] : cols),
      []
    )
    return [...cols, { key: "actions" }]
  }

  get list() {
    return get(this.dataObject, "list", [])
  }

  get total() {
    return get(this.dataObject, "total", 0)
  }

  get activeList() {
    return get(this.dataActiveObject, "list", [])
  }

  get activeTotal() {
    return get(this.dataActiveObject, "total", 0)
  }

  get shareData() {
    return {
      perPage: this.perPage,
      currentPage: this.currentPage,
    }
  }

  get isLoading() {
    return this.IS_LOADING(`${this.MODULE_NAME}/list`) || this.IS_LOADING(`${this.MODULE_NAME}/search`)
  }

  get updatePositionLoading() {
    return this.IS_LOADING(`${this.MODULE_NAME}/updatePosition`)
  }

  get listOptions() {
    return {
      tableColumns: this.tableColumns,
      list: this.list,
      isLoading: this.isLoading,
      total: this.total,
      editInfo: this.editInfo,
      prefixPath: this.PREFIX_PATH,
      deleteItem: this.onDeleteItem,
      onSearch: this.onSearch,
      onRefreshTable: this.onRefreshTable,
      addNewContent: this.addNewContent,
      onSelectChanged: this.onSelectChanged,
    }
  }

  viewInfo(item) {
    this.$router.push({ name: "content-feed-info", params: { id: item.id } })
  }

  public getState(value) {
    if (!value) return "-"
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  async onSearch(keyword) {
    await this.$store.dispatch(`${this.MODULE_NAME}/search`, {
      keyword,
      limit: this.shareData.perPage,
      offset: (this.shareData.currentPage - 1) * this.shareData.perPage,
    })
  }

  async fetchList(payload) {
    if (this.needToFetchActiveItem) {
      await this.fetchActiveList()
    }
    await this.$store.dispatch(`${this.MODULE_NAME}/list`, payload)
  }

  async fetchActiveList() {
    await this.$store.dispatch(`${this.MODULE_NAME}/fetchActive`)
    this.selectedItems = this.activeList.map((item, index) => {
      return {
        ...item,
        position: item.position !== 0 && !item.position ? index : item.position,
      }
    })
  }

  async update(payload) {
    await this.$store.dispatch(`${this.MODULE_NAME}/update`, payload)
  }

  async onRemove() {
    const id = get(this.deleteModel.item, "id", "")
    await this.deleteItem({ id }, async () => {
      if (this.needToFetchActiveItem) {
        await this.fetchActiveList()
      }
      await this.onRefreshTable()
    })
  }

  public onSelectChanged() {
    console.log("on select change")
  }

  get editInfo() {
    return `${this.MODULE_NAME}-edit`
  }

  get addNewContent() {
    return { name: `${this.MODULE_NAME}-create` }
  }

  async onPinnedSave() {
    await Promise.all(
      this.selectedItems.map(async (item, index) => {
        const payload = { ...item, position: index }
        return await this.update({
          id: item.id,
          item: payload,
          caller: "updatePosition",
        })
      })
    )
    this.$toast({
      component: ToastificationContent,
      position: "top-right",
      props: {
        title: `Successfully`,
        icon: "CoffeeIcon",
        variant: "success",
        text: `Update hero banner success.🍺`,
      },
    })
  }

  async onRefreshTable() {
    await this.fetchList({
      limit: this.shareData.perPage,
      offset: (this.shareData.currentPage - 1) * this.shareData.perPage,
    })
  }

  dateFormat(value) {
    return flow([dateFormat])(value)
  }

  async mounted() {
    const request = [
      await this.fetchList({
        limit: this.perPage,
        offset: (this.currentPage - 1) * this.perPage,
      }),
    ]
    await Promise.all(request)
  }
}
