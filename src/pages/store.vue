<template>
  <div>
    {{ feeds }}
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { Action, Getter } from "vuex-class"
@Component({ name: "store" })
export default class Store extends Vue {
  @Action("couponBanner/fetchCouponBanners")
  private fetchFeeds
  @Getter("couponBanner/couponBanners")
  private FEEDS
  get feeds() {
    return this.FEEDS
  }
  async mounted() {
    this.fetchFeeds()
  }
}
</script>
