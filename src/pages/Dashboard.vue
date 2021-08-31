<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="6" md="12">
        <coin-allocation />
      </b-col>
      <b-col lg="3" sm="6">
        <pre>block 2</pre>
      </b-col>
      <b-col lg="3" sm="6">
        <pre>block 3</pre>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <pre>block 4</pre>
      </b-col>
      <b-col lg="6">
        <pre>block 5</pre>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <coin-holding />
      </b-col>
    </b-row>
  </section>
</template>

<script lang="ts">
import { BRow, BCol } from 'bootstrap-vue'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { get } from 'lodash'
import CoinHolding from '@/components/CoinHoldingList.vue'
import CoinAllocation from '@/components/CoinAllocation.vue'

@Component({
  components: {
    BCol,
    BRow,
    CoinHolding,
    CoinAllocation
  }
})
export default class Home extends Vue {
  @Action('classA/getUserBalances')
  private requestUserBalances
  @Getter('classA/userBalances')
  private balances
  get balanceItem() {
    return get(this.balances, ['items'], [])
  }
  async mounted() {
    await this.requestUserBalances({
      address: '0xa6bf7fcebc4b4148c0c54324b190aaa7a779362e'
    })
  }
}
</script>

<style scoped></style>
