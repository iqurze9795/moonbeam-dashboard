<template>
  <section>
    <b-input-group>
      <b-input-group-prepend is-text>
        <feather-icon icon="LinkIcon" />
      </b-input-group-prepend>
      <b-form-input
        :value="address"
        :disabled="true"
        placeholder="Connect your wallet."
      />
    </b-input-group>
  </section>
</template>
<script lang="ts">
import {
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
  BButton
} from 'bootstrap-vue'

import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
import { get } from 'lodash'
@Component({
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
    BButton
  }
})
export default class AddressSearch extends Vue {
  @Action('classA/getUserBalances')
  private requestUserBalances
  @Getter('account/address')
  private address

  async mounted() {
    // console.log(this.$route.query.address)
    // if (this.$route.query.address) {
    //   this.address = this.$route.query.address
    // } else if (localStorage.getItem('address')) {
    //   this.address = localStorage.getItem('address')
    // }
    // if (isEmpty(this.address)) {
    //   this.$router.push({ name: 'dashboard', query: { address: this.address } })
    //   await this.requestUserBalances({
    //     address: this.address
    //   })
    // }
    // this.onDebounce = debounce(async () => {
    //   localStorage.setItem('address', this.address as string)
    //   await this.requestUserBalances({
    //     address: this.address
    //   })
    // }, 400)
  }
}
</script>
