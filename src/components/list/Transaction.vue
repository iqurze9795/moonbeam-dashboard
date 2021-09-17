<template>
  <b-card no-body>
    <b-card-body>
      <app-timeline>
        <app-timeline-item
          v-for="(item, index) in txs"
          :key="index"
          :title="item.allowance"
          :tokenAddress="item.tokenApproved"
          :contractAddress="item.contract"
          icon="ActivityIcon"
          time="few minutes ago"
          :variant="`${item.allowance === 'unlimited' ? 'danger' : 'warning'}`"
        />
      </app-timeline>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  VBTooltip
} from 'bootstrap-vue'
import AppTimeline from '@/components/timeline/TimeLine.vue'
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
