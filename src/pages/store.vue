<template>
  <div>hello this is store</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
@Component({ name: 'store' })
export default class Store extends Vue {
  @Action('debank/getUserBalances')
  private getUserBalances

  async mounted() {
    await this.getUserBalances({
      address: '0x08B40414525687731C23F430CEBb424b332b3d35'
    })
  }
}
</script>
