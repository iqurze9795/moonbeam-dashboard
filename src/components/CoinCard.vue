<template>
  <b-card class="text-center">
    <span class="d-flex pb-2 justify-content-end">
      <b-badge variant="warning">Rank: {{ rank }}</b-badge>
    </span>
    <div>
      <div class="img-container">
        <img :src="icon" />
      </div>
      <div class="truncate">
        <h2 class="mb-25 font-weight-bolder pt-2">${{ formatPrice(price) }}</h2>
        <span>{{ symbol }}</span>
      </div>
    </div>
  </b-card>
</template>

<script>
import { BCard, BBadge } from 'bootstrap-vue'
import { bigNumber } from '@/utils/helpers'
export default {
  components: {
    BCard,
    BBadge
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    price: {
      type: [Number, String],
      required: true
    },
    symbol: {
      type: String,
      default: ''
    },
    rank: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatPrice: (value) => {
      return bigNumber(value)
    }
  }
}
</script>
<style lang="scss" scoped>
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
