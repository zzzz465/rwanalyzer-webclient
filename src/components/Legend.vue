<style lang="less" scoped>

</style>

<template lang="pug">
  .root
    .asdf asdf
</template>

<script lang="ts">
import { ProfileLog } from '@/Logs/ProfileLog'
import Vue from 'vue'
export default Vue.extend({
  props: {
    profileLog: {
      type: ProfileLog,
      required: true
    }
  },
  computed: {
    key (): string { return this.$el.getAttribute('key') || '' },
    label (): string { return this.$el.getAttribute('label') || '' }
  }
})
</script>
