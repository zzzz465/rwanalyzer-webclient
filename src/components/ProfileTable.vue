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
  .click {
    cursor: pointer;
  }
  .divider {
    width: 95%;
    height: 2px;
    margin: 4px;
    margin-left: auto;
    margin-right: auto;
    background-color: RGB(80, 80, 80);
  }
  .selected {
    background-color: blue;
  }
  .col {
    flex: 1;
    text-align: center;
  }
  .large-col {
    flex: 7;
    overflow: hidden;
  }
  .check-box {
    flex: 0.5;
  }
</style>

<template lang="pug">
  .root-ProfileTable
    .table
      .header
        .col.check-box selection
        .col Average
        .col Percent
        .col Total
        .col Hits
        .col.large-col Name
      .divider
      .content
        div(
          v-for="log in profileLogs"
        )
          .row(v-bind:class="{ selected: selected.has(log.key) }")
            .col.check-box.click(@click="onClickRow(log)")
            .col.average {{ log.average | number }}
            .col.percent NULL
            .col.total {{ log.total | number }}
            .col.hits {{ log.hits }}
            .col.large-col.click(@click="onNameSelected(log)") {{ log.label }}
          .divider
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import { LogManager } from '@/Logs/LogManager'
import { ProfileLog } from '@/Logs/ProfileLog'
import { clearIntervals } from '@/Utils/interval'

// 현재 기록되는 아이템들을 보여줌

export default Vue.extend({
  model: {
    prop: 'selected',
    event: 'selectionChange'
  },

  props: {
    logManager: {
      type: LogManager,
      required: true
    },
    selected: { // Set<string>
      type: Set,
      required: true
    }
  },

  computed: {
  },

  filters: {
    number (value: number) {
      return value.toFixed(3).toString() + 'ms'
    }
  },

  data () {
    return {
      profileLogs: [] as ProfileLog[],
      updateKeys: [] as number[]
    }
  },

  mounted () {
    clearIntervals(this.updateKeys)

    this.updateKeys = [
      setInterval(() => {
        this.updateValues()
      }, 100)
    ]
  },

  methods: {
    updateValues () {
      this.profileLogs = this.logManager.profileLogs.sort(d => d.average)
    },

    onNameSelected (row: ProfileLog): void {
      this.$emit('nameSelected', row)
    },

    onClickRow (row: ProfileLog): void {
      const key = row.key
      if (this.selected.has(key))
        this.selected.delete(key)
      else
        this.selected.add(key)

      this.$emit('selectionChange')
    }
  }
})
</script>
