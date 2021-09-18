<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>Statistics</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row class="container">
        <b-col
          v-for="item in items"
          :key="item.icon"
          md="3"
          sm="6"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="70" :variant="item.color">
                <feather-icon size="34" :icon="item.icon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h3 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h3>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody
} from 'bootstrap-vue'
import { Prop } from 'vue-property-decorator'
@Component({
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody
  }
})
export default class StatisticCard extends Vue {
  @Prop({ default: () => {} }) items
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.center {
  display: flex;
  justify-content: center;
}
</style>
