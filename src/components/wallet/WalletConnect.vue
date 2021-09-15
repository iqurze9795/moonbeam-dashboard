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
import { ethers } from 'ethers'
@Component({
  components: {
    BButton
  }
})
export default class WalletConnect extends Vue {
  private async subscribeProvider(provider) {
    // Subscribe to accounts change
    provider.on('accountsChanged', async (info: any) => {
      console.log('accountsChanged', info)
    })

    // Subscribe to chainId change
    provider.on('chainChanged', async (info: any) => {
      console.log('accountsChanged', info)
    })

    // Subscribe to networkId change
    provider.on('networkChanged', async (info: any) => {
      console.log('networkChanged', info)
    })
  }
  private async onInitAccount(provider) {
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const [address] = await web3Provider.listAccounts()
    const { chainId } = await web3Provider.getNetwork()
    this.$store.dispatch('account/setAddress', address)
    this.$store.dispatch('account/setChainId', chainId)
    this.$store.dispatch('account/setConnectProviderStatus', true)
  }
  private async onConnect() {
    const web3Modal = (window as any).web3Modal
    const result = await web3Modal.connect()
    await this.onInitAccount(result)
    await this.subscribeProvider(result)
  }
  private mounted() {
    const web3Modal = (window as any).web3Modal
    if (web3Modal.cachedProvider) {
      this.onConnect()
    }
  }
}
</script>
<style lang="scss" scoped></style>
