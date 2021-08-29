import Cloudinary from "cloudinary"
import iframeResizer from "iframe-resizer"

declare module "*.vue" {
  import Vue from "vue"
  export default Vue
}

declare global {
  interface Window {
    cloudinary: Cloudinary
  }
  interface HTMLElement {
    iFrameResizer?: iframeResizer
  }
}
