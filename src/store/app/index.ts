import { $themeBreakpoints } from "@themeConfig"

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    contentFormMultiUploadSection: "",
  },
  getters: {
    currentBreakPoint: (state) => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return "xl"
      if (windowWidth >= $themeBreakpoints.lg) return "lg"
      if (windowWidth >= $themeBreakpoints.md) return "md"
      if (windowWidth >= $themeBreakpoints.sm) return "sm"
      return "xs"
    },
    contentFormMultiUploadSection: (state) => state.contentFormMultiUploadSection,
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    CONTENT_FORM_MULTI_UPLOAD_SECTION(state, val) {
      state.contentFormMultiUploadSection = val
    },
  },
  actions: {
    contentFormMultiUploadSection({ commit }, val) {
      commit("CONTENT_FORM_MULTI_UPLOAD_SECTION", val)
    },
  },
}
