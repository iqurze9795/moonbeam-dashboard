<template>
  <div>
    <h3>Top Coins By market</h3>
    <swiper class="swiper-responsive-breakpoints" :options="swiperOptions">
      <swiper-slide v-for="(data, index) in swiperData" :key="index">
        <coin-card
          :icon="data.logoUrl"
          :price="data.quoteRate"
          :symbol="data.symbol"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import CoinCard from '@/components/CoinCard.vue'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    CoinCard
  },
  data() {
    return {
      /* eslint-disable global-require */
      swiperData: [
        {
          contract_decimals: 18,
          label: 'Wrapped Ether',
          symbol: 'WETH',
          contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
          quoteRate: 3475.723,
          rank: 2
        },
        {
          contract_decimals: 18,
          label: 'BNB',
          symbol: 'BNB',
          contract_address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0xb8c77482e45f1f44de1745f52c74426c631bdd52.png',
          quoteRate: 466.92862,
          rank: 4
        },
        {
          contract_decimals: 6,
          label: 'Tether USD',
          symbol: 'USDT',
          contract_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
          quoteRate: 1.0044088,
          rank: 5
        },
        {
          contract_decimals: 6,
          label: 'USD Coin',
          symbol: 'USDC',
          contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
          quoteRate: 1.0044088,
          rank: 10
        },
        {
          contract_decimals: 18,
          label: 'Uniswap',
          symbol: 'UNI',
          contract_address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
          quoteRate: 29.410172,
          rank: 11
        },
        {
          contract_decimals: 18,
          label: 'Binance USD',
          symbol: 'BUSD',
          contract_address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x4fabb145d64652a948d72533023f6e7a623c7c53.png',
          quoteRate: 1.003936,
          rank: 13
        },
        {
          contract_decimals: 18,
          label: 'ChainLink Token',
          symbol: 'LINK',
          contract_address: '0x514910771af9ca656af840dff83e8264ecf986ca',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x514910771af9ca656af840dff83e8264ecf986ca.png',
          quoteRate: 27.140793,
          rank: 14
        },
        {
          contract_decimals: 8,
          label: 'Wrapped BTC',
          symbol: 'WBTC',
          contract_address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
          quoteRate: 47356.89,
          rank: 18
        },
        {
          contract_decimals: 18,
          label: 'Matic Token',
          symbol: 'MATIC',
          contract_address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png',
          quoteRate: 1.3444136,
          rank: 19
        },
        {
          contract_decimals: 18,
          label: 'Avalanche',
          symbol: 'AVAX',
          contract_address: '0x9debca6ea3af87bf422cea9ac955618ceb56efb4',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x9debca6ea3af87bf422cea9ac955618ceb56efb4.png',
          quoteRate: 41.019512,
          rank: 24
        },
        {
          contract_decimals: 8,
          label: 'Compound Ether',
          symbol: 'cETH',
          contract_address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5.png',
          quoteRate: 69.648,
          rank: 27
        },
        {
          contract_decimals: 18,
          label: 'OKB',
          symbol: 'OKB',
          contract_address: '0x75231f58b43240c9718dd58b4967c5114342a86c',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x75231f58b43240c9718dd58b4967c5114342a86c.png',
          quoteRate: 22.180223,
          rank: 29
        },
        {
          contract_decimals: 18,
          label: 'Dai Stablecoin',
          symbol: 'DAI',
          contract_address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.png',
          quoteRate: 1.0053548,
          rank: 30
        },
        {
          contract_decimals: 18,
          label: 'Aave Token',
          symbol: 'AAVE',
          contract_address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
          quoteRate: 404.54318,
          rank: 31
        },
        {
          contract_decimals: 18,
          label: 'FirstBlood Token',
          symbol: '1ST',
          contract_address: '0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7',
          supports_erc: null,
          logoUrl:
            'https://logos.covalenthq.com/tokens/0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7.png',
          quoteRate: 24.394747,
          rank: 32
        }
      ],
      /* eslint-disable global-require */

      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 50,
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
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  }
}
</script>
