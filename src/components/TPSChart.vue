<style lang="scss" scoped>

</style>

<template lang="pug">
  
</template>

<script lang="ts">
import { LogManager } from '@/Logs/LogManager'
import { AsEnumerable } from 'linq-es2015'
import Vue from 'vue'
export default Vue.extend({
  props: {
    logManager: {
      type: LogManager,
      required: true
    },
    range: {
      type: Number,
      default: 300
    }
  },

  methods: {
    updateGraph () {
      AsEnumerable(this.logManager.profileLogs)
        .Select(t => t.chunks)
    }
  }
})
</script>
