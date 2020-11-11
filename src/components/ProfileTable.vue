<style scoped>
  .root-ProfileTable {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
  }
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .divider {
    content: " ";
    width: 98%;
    display: block;
    height: 1px;
    background-color: RGB(150, 150, 150);
    align-self: center;
  }
  .content {
    flex: 10;
    justify-content: space-around;
    align-items: center;
    overflow: auto;
  }
  .content::-webkit-scrollbar {
    background: #1f38509f;
  }
  .content::-webkit-scrollbar-thumb {
    background: #49525c;
  }
  .row {
    display: flex;
    flex-grow: 0;
    margin: 0;
  }
  .col {
    flex: 1;
    text-align: center;
  }
  .large-col {
    flex: 7;
    overflow: hidden;
  }
</style>

<template lang="pug">
  .root-ProfileTable
    .table
      .header
        .col Average
        .col Percent
        .col Total
        .col Hits
        .col.large-col Name
      .divider
      .content
        div.row(v-for="log in profileLogs")
          .col.average {{ log.average | number }}
          .col.percent NULL
          .col.total {{ log.total | number }}
          .col.hits {{ log.hits }}
          .col.large-col {{ log.label }}
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import { LogManager } from '@/Logs/LogManager'
import { ProfileLog } from '@/Logs/ProfileLog'

// 현재 기록되는 아이템들을 보여줌

export default Vue.extend({
  props: {
    logManager: {
      type: LogManager,
      required: true
    }
  },

  computed: {
  },

  filters: {
    number(value: number) {
      return value.toFixed(3).toString() + 'ms'
    }
  },

  data() {
    return {
      profileLogs: [] as ProfileLog[]
    }
  },

  mounted() {
    setInterval(() => {
      this.updateValues()
    }, 100)
  },

  methods: {
    updateValues () {
      this.profileLogs = this.logManager.profileLogs.sort(d => d.average)
      // const contentDiv = this.$refs.content as HTMLDivElement
      // const profileLogs = this.logManager.profileLogs
// 
      // d3.select(contentDiv)
        // .selectAll<HTMLDivElement, ProfileLog>('div')
        // .data(profileLogs, d => d.key)
        // .join('div')
    }
  }
})
</script>
