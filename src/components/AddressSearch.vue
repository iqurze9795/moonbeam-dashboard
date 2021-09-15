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
import { get, isEmpty } from 'lodash'
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
  @Getter('account/address')
  private address
}
</script>
