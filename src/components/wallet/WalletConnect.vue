<template>
  <section>
    <template v-if="isConnectProvider">
      <!-- <wallet-connect /> -->
      <div class="d-flex align-items-center">
        <div class="d-sm-flex d-none chain pr-1">
          <p class="user-name font-weight-bolder mb-0">
            {{ mapChainName[chainId] }}
          </p>
          <span class="user-status">Chain ID: {{ chainId }}</span>
        </div>
        <b-avatar
          size="40"
          :src="mapChainLogo[chainId]"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
        >
        </b-avatar>
      </div>
    </template>
    <b-button
      v-else
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
import { ethers } from 'ethers'
import { BButton, BAvatar } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { Action, Getter } from 'vuex-class'
import Ripple from 'vue-ripple-directive'
@Component({
  components: {
    BAvatar,
    BButton,
    ToastificationContent
  },
  directives: {
    Ripple
  }
})
export default class WalletConnect extends Vue {
  @Action('classA/getUserBalances')
  private requestUserBalances
  @Getter('preference/address')
  private address
  @Getter('preference/chainId')
  private chainId
  @Getter('preference/isConnectProvider')
  private isConnectProvider
  private subportChainID = ['1284', '1285']
  private mapChainLogo = {
    1: require(`@/assets/images/chains/eth.png`),
    56: require(`@/assets/images/chains/bsc.png`),
    137: require(`@/assets/images/chains/matic.png`),
    1285: require(`@/assets/images/chains/moonriver.png`)
  }
  private mapChainName = {
    1: 'Ethereum Mainet',
    56: 'Binance Smart Chain',
    137: 'Matic(Polygon)',
    1285: 'Moonriver'
  }
  private async subscribeProvider(provider) {
    // Subscribe to accounts change
    provider.on('accountsChanged', async (info: any) => {
      const [address] = info
      this.$store.dispatch('preference/setAddress', address)
      this.getUserBalance()
    })

    // Subscribe to chainId change
    provider.on('chainChanged', async (info: any) => {
      console.log('chainChanged', info)
    })

    // Subscribe to networkId change
    provider.on('networkChanged', async (chainId: any) => {
      this.$store.dispatch('preference/setChainId', chainId)
      this.getUserBalance()
      // if (this.subportChainID.includes(chainId)) {
      //   this.$store.dispatch('account/setChainId', chainId)
      // } else {
      //   this.$toast({
      //     component: ToastificationContent,
      //     position: 'top-right',
      //     props: {
      //       title: `Error`,
      //       icon: 'WifiOffIcon',
      //       variant: 'danger',
      //       text: `Unsupported chain id ${chainId}`
      //     }
      //   })
      // }
    })
  }
  private async getUserBalance() {
    await this.requestUserBalances({
      address: this.address,
      chainId: this.chainId
    })
  }
  private async onInitAccount(provider) {
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const [address] = await web3Provider.listAccounts()
    const { chainId } = await web3Provider.getNetwork()
    this.$store.dispatch('preference/setAddress', address)
    this.$store.dispatch('preference/setChainId', chainId)
    this.$store.dispatch('preference/setConnectProviderStatus', true)
    this.getUserBalance()
  }
  private async onConnect() {
    const web3Modal = (window as any).web3Modal
    const provider = await web3Modal.connect()
    this.$store.dispatch('preference/setProvider', provider)
    await this.onInitAccount(provider)
    await this.subscribeProvider(provider)
  }
  private mounted() {
    const web3Modal = (window as any).web3Modal
    if (web3Modal.cachedProvider) {
      this.onConnect()
    }
  }
}
</script>
<style lang="scss" scoped>
.chain {
  flex-direction: column;
}
</style>
