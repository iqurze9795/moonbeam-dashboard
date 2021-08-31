<template>
  <b-card v-if="balanceItem" no-body class="card-company-table">
    <b-table :items="balanceItem" responsive :fields="fields" class="mb-0">
      <!-- company -->
      <template #cell(logoUrl)="{ value }">
        <div class="d-flex align-items-center">
          <div class="img-container">
            <img :src="value" />
          </div>
          <div>
            <!-- <div class="font-weight-bolder">
              {{ data.item.title }}
            </div>
            <div class="font-small-2 text-muted">
              {{ data.item.subtitle }}
            </div> -->
          </div>
        </div>
      </template>

      <!-- category -->
      <template #cell(category)="data">
        <div class="d-flex align-items-center">
          <b-avatar class="mr-1" :variant="data.item.avatarColor">
            <feather-icon size="18" :icon="data.item.avatarIcon" />
          </b-avatar>
          <span>{{ data.item.avatarTitle }}</span>
        </div>
      </template>
      <!-- views -->
      <template #cell(label)="{ value }">
        <div class="d-flex flex-column">
          <span class="font-weight-bolder mb-25">{{ value.name }}</span>
          <span class="font-small-2 text-muted text-nowrap">{{
            value.type
          }}</span>
        </div>
      </template>

      <template #cell(quoteRate)="{ value }">
        {{ '$' + value }}
      </template>
      <template #cell(quoteRate24H)="{ value }">
        {{ '$' + value }}
      </template>

      <template #cell(value)="{ value }">
        {{ '$' + value }}
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
import { BCard, BTable, BAvatar, BImg } from 'bootstrap-vue'
import { Action, Getter } from 'vuex-class'
import { get } from 'lodash'
import { convertToHumanUnit, bigNumber, percentChange } from '@/utils/helpers'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {
    BCard,
    BTable,
    BAvatar,
    BImg
  }
})
export default class CoinHoldingList extends Vue {
  @Action('classA/getUserBalances')
  private requestUserBalances
  @Getter('classA/userBalances')
  private balances

  get balanceItem() {
    return get(this.balances, ['items'], [])
      .filter((item) => {
        return item.quoteRate && parseInt(item.balance) > 0
      })
      .map((item) => {
        console.log('item::', item)
        return {
          ...item,
          label: {
            name: item.contractName,
            type: item.contractTickerSymbol
          },
          balance: `${convertToHumanUnit(item.balance, item.contractDecimals)}`,
          quoteRate: bigNumber(item.quoteRate),
          quoteRate24H: bigNumber(item.quoteRate24H),
          change: percentChange(item.quoteRate24H, item.quoteRate),
          value: convertToHumanUnit(
            item.balance * item.quoteRate,
            item.contractDecimals
          )
        }
      })
  }

  get fields() {
    return [
      { key: 'logoUrl', label: 'Logo' },
      { key: 'label', label: 'Asset' },
      { key: 'balance', label: 'Balance' },
      { key: 'value', label: 'Value' },
      { key: 'quoteRate', label: 'Price' },
      { key: 'quoteRate24H', label: 'Price 24H' },
      { key: 'change', label: 'Change' }
    ]
  }
  async mounted() {
    await this.requestUserBalances({
      address: '0xa6bf7fcebc4b4148c0c54324b190aaa7a779362e'
    })
  }

  // {
  //         avatarImg: require('@/assets/images/icons/toolbox.svg'),
  //         title: 'Dixons',
  //         subtitle: 'meguc@ruj.io',
  //         avatarIcon: 'MonitorIcon',
  //         avatarColor: 'light-primary',
  //         avatarTitle: 'Technology',
  //         viewTitle: '23.4k',
  //         viewsub: 'in 24 hours',
  //         revenue: '891.2',
  //         sales: '68',
  //         loss: true
  //       },
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
</style>
