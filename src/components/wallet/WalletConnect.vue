<template>
  <section>
    <b-button
      @click="onConnect"
      v-ripple.400="'rgba(0, 207, 232, 0.15)'"
      variant="info"
      pill
    >
      Connect Wallet
    </b-button>
  </section>
</template>

<script lang="ts">
import { BButton } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  components: {
    BButton
  }
})
export default class WalletConnect extends Vue {
  private async subscribeProvider(provider) {
    // Subscribe to accounts change
    provider.on('accountsChanged', async (info: any) => {
      console.log(info)
    })

    // Subscribe to chainId change
    provider.on('chainChanged', async (info: any) => {
      console.log(info)
    })

    // Subscribe to networkId change
    provider.on('networkChanged', async (info: any) => {})
  }
  private async onConnect() {
    const web3Modal = (window as any).web3Modal
    const result = await web3Modal.connect()
    await this.subscribeProvider(result)
  }
}
</script>
<style lang="scss" scoped></style>
