<template>
  <b-card no-body>
    <b-card-body>
      <app-timeline>
        <app-timeline-item
          v-for="(item, index) in txs"
          :key="index"
          :allowance="item.allowance"
          :tokenAddress="item.tokenApproved"
          :contractAddress="item.contract"
          icon="CompassIcon"
          :time="item.timeStamp"
          :symbol="item.symbol"
          :variant="`${item.allowance === 'Unlimited' ? 'danger' : 'warning'}`"
        />
      </app-timeline>
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  VBTooltip
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    AppTimeline,
    AppTimelineItem
  },
  directives: {
    'b-tooltip': VBTooltip
  }
})
export default class Transaction extends Vue {
  @Prop({ default: () => [] }) txs
}
</script>
