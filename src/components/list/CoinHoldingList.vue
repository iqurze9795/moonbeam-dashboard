<template>
  <b-card v-if="balances" no-body class="card-company-table">
    <b-card-header><h4>Wallet Holding</h4></b-card-header>
    <b-table
      :items="balances"
      :busy="isLoading"
      responsive
      :fields="fields"
      show-empty
      class="mb-0"
    >
      <template #table-busy>
        <div class="view-state loading">
          <div class="text-center text-danger">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="view-state empty">There's no balances in your wallet.</div>
      </template>
      <!-- company -->
      <template #cell(logoUrl)="{ value }">
        <div class="d-flex align-items-center">
          <div class="img-container">
            <img :src="value" />
          </div>
        </div>
      </template>
      <template #cell(label)="{ value }">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder mb-25">{{ value.name }}</span>
          <span class="font-small-2 text-muted text-nowrap">
            {{ value.type }}
          </span>
        </div>
      </template>

      <template #cell(price)="{ value }">
        {{ '$' + format(value) }}
      </template>

      <template #cell(value)="{ value }">
        {{ '$' + format(value) }}
      </template>
      <template #cell(amount)="{ value }">
        {{ format(value) }}
      </template>
      <!-- sales -->
      <template #cell(change)="{ value }">
        <div class="d-flex align-items-center">
          <span class="font-weight-bolder mr-1">{{ value + '%' }}</span>
          <feather-icon
            :icon="value < 0 ? 'TrendingDownIcon' : 'TrendingUpIcon'"
            :class="value < 0 ? 'text-danger' : 'text-success'"
          />
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import { BCard, BTable, BSpinner, BAvatar, BImg } from 'bootstrap-vue'
import { Getter } from 'vuex-class'
import BigNumber from 'bignumber.js'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {
    BCard,
    BTable,
    BAvatar,
    BSpinner,
    BImg,
  },
})
export default class CoinHoldingList extends Vue {
  @Getter('debank/userBalances')
  private balances

  get isLoading() {
    return this.$store.getters['service/isLoading']('debank/getUserBalance')
  }

  get fields() {
    return [
      { key: 'logoUrl', label: 'Logo' },
      { key: 'name', label: 'Asset' },
      { key: 'amount', label: 'Balance' },
      { key: 'price', label: 'Price' },
      { key: 'value', label: 'Value' },
      
    ]
  }
  private format(value) {
    if (value >= 1) {
      return new BigNumber(value).toFormat(2)
    }
    if (value < 1 && value > 0.1) {
      return new BigNumber(value).toFormat(4)
    }
    return new BigNumber(value).toFormat(6)
  }
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}
.img-container {
  width: 35px !important;
  height: 35px !important;
  display: inline-block;
  border-radius: 100%;
  overflow: hidden;
  &:not(:first-child) {
    margin-left: -15px;
  }

  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.view-state {
  display: flex;
  align-items: center;
  justify-content: center;

  &.loading,
  &.empty {
    height: 300px;
  }
}
</style>
