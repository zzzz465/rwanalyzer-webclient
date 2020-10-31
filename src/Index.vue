<style scoped>
  .root {
    display: flex;
    /* background-color: gray; */
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    height: 1050px;
  }
  .left {
    flex: 1;
  }
  .tab {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: scroll;
  }
  .right {
    margin-left: 20px;
    flex: 6;
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
  }
  .top {
    flex: 3
  }
  .graph {
    flex: 7;
  }
</style>

<template lang="pug">
  .root
    .left
      Tab.tab(
        :items="tabs"
        :currentEntry="currentEntry"
      )
    .right
      .top
      BasicChart.graph(
        :logs="logs"
        :lastTick="dataReceiver.currentTick"
        :tickPerScreen="300"
        :resolution="100"
        )
</template>

<script lang="ts">
import Vue from 'vue'
import BasicChart from './components/BasicChart.vue'
import Tab from './components/Tab/TabContainer.vue'
import { AsEnumerable } from 'linq-es2015'
import { DataReceiver, Events, ProfileLog, TickLog } from './DataReceiver'

interface Tab {
  tab: Entry[]
  category: string
}

interface Entry {
  name: string
}

export default Vue.extend({
  components: {
    BasicChart,
    Tab
  },
  data () {
    const dataReceiver = new DataReceiver()

    const returnValue = {
      dataReceiver,
      tick: 0,
      tabs: new Map<string, Set<string>>(),
      currentEntry: '',
      logs: [] as ProfileLog[]
    }

    dataReceiver.eventHandler = (data) => {
      switch (data.type) {

        case 'InitEntries': {
          const result = AsEnumerable(data.data)
            .GroupBy((d: any) => d.category, (v: any) => v.name)
            .ToMap(d => d.key as string, v => new Set<string>(v))

          returnValue.tabs = result
        } break

        case 'EntryAdded': {
        } break

        case 'EntrySwapped': {
          returnValue.currentEntry = data.data.name as string
        } break

        case 'data': {
          returnValue.logs = [...dataReceiver.logs.values()]
        } break
      }
    }

    return returnValue
  },

  computed: {
  },
  mounted () {
    // test code

    const DEBUG = false // set true to debug mode.
    if (DEBUG) {
      const log = new ProfileLog('test_data', 'test_data')
      this.dataReceiver.logs.set(log.key, log)

      const log2 = new ProfileLog('test_data2', 'test_data2')
      this.dataReceiver.logs.set(log2.key, log2)

      const log3 = new ProfileLog('test_data3', 'test_data3')
      this.dataReceiver.logs.set(log3.key, log3)

      const log4 = new ProfileLog('test_data4', 'test_data4')
      this.dataReceiver.logs.set(log4.key, log4)

      setInterval(() => {
        const mockDataFactory = () => ({
          hit: Math.floor(Math.random() * 100) % 100,
          time: Math.floor(Math.random() * 30),
          tick: this.tick
        })

        log.appendLog(mockDataFactory())
        log2.appendLog(mockDataFactory())
        log3.appendLog(mockDataFactory())
        log4.appendLog(mockDataFactory())
        this.tick += 1
      }, 50)
    }
  }
})
</script>
