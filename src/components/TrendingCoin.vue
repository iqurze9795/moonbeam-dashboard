<template>
  <div>
    <h3>Trending Coins</h3>
    <swiper class="swiper-responsive-breakpoints" :options="swiperOptions">
      <swiper-slide v-for="(data, index) in trending" :key="index">
        <coin-card
          :icon="data.small"
          :price="data.price"
          :symbol="data.symbol"
          :rank="data.marketCapRank"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import CoinCard from '@/components/CoinCard.vue'
import 'swiper/css/swiper.css'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
@Component({
  components: {
    Swiper,
    SwiperSlide,
    CoinCard
  }
})
export default class TrendingCoin extends Vue {
  @Action('coinGecko/getTrending')
  private getTrending
  @Getter('coinGecko/trending')
  private trending

  get swiperOptions() {
    return {
      slidesPerView: 4,
      spaceBetween: 50,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        320: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    }
  }
  private async mounted() {
    await this.getTrending()
  }
}
</script>
