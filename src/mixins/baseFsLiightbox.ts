import Vue from "vue"
import { Component } from "vue-property-decorator"
import FsLightbox from "fslightbox-vue"

@Component({
  components: {
    FsLightbox,
  },
})
export default class BaseFsLiightbox extends Vue {
  fsLightItems: any = []
  fsLightToggler = false
  fsLightSlide = 1

  openFsLightbox(index) {
    this.fsLightSlide = index + 1

    setTimeout(() => {
      this.fsLightToggler = !this.fsLightToggler
    }, 300)
  }
}
