<template>
  <section>
    <b-row>
      <b-col> Home </b-col>
    </b-row>
  </section>
</template>

<script lang="ts">
import { BRow, BCol } from "bootstrap-vue"
import { Component, Vue } from "vue-property-decorator"
@Component({
  components: {
    BCol,
    BRow,
  },
})
export default class Home extends Vue {}
</script>

<style scoped></style>
