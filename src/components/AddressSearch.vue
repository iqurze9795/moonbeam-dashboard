<template>
  <section>
    <b-input-group>
      <b-input-group-prepend is-text>
        <feather-icon icon="SearchIcon" />
      </b-input-group-prepend>
      <b-form-input
        v-model="address"
        @input="onDebounce"
        placeholder="Input your address here."
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
import debounce from 'lodash/debounce'
import { Action } from 'vuex-class'
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
  private address = ''
  private onDebounce = () => {}
  async mounted() {
    const address = localStorage.getItem('address')
    if (address) {
      this.address = address
      // this.$router.push({ path: '/dashboard', query: { address: this.address } })
      await this.requestUserBalances({
        address
      })
    }

    this.onDebounce = debounce(async () => {
      localStorage.setItem('address', this.address)
      await this.requestUserBalances({
        address: this.address
      })
    }, 400)
  }
}
</script>
