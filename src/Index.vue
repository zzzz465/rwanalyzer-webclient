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
        v-btn(@click="yAxisReference = 'avgTime'") change to avgTime
        v-btn(@click="yAxisReference = 'time'") change to time
      .top
        h3 current setting: {{ yAxisReference }}
      BasicChart.graph(
        :logs="logs"
        :lastTick="logManager.currentTick"
        :tickPerScreen="300"
        :resolution="100"
        :yAxisReference="yAxisReference"
        )
</template>

<script lang="ts">
import Vue from 'vue'
import BasicChart from './components/BasicChart.vue'
import Tab from './components/Tab/TabContainer.vue'
import { AsEnumerable } from 'linq-es2015'
import { LogManager } from './Logs/LogManager'
import { Events, WebSocketLogDataReceiver, MockLogDataReceiver, iLogDataReceiver } from './Logs/LogDataReceiver'
import { ProfileLog } from './Logs/ProfileLog'

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
    const logManager = new LogManager()

    const returnValue = {
      logManager,
      tick: 0,
      tabs: new Map<string, Set<string>>(),
      currentEntry: '',
      logs: [] as ProfileLog[],
      yAxisReference: 'avgTime'
    }

    const webSocketLogDataReceiver = new WebSocketLogDataReceiver()
    // const mockLogDataReceiver = new MockLogDataReceiver(10)

    // change this
    const iLog: iLogDataReceiver = webSocketLogDataReceiver
    // const iLog: iLogDataReceiver = mockLogDataReceiver
    // mockLogDataReceiver.Start()

    iLog.onDataReceive = (data) => {
      switch (data.type) {
        case Events.LogData: {
          logManager.processData(data)
          returnValue.logs = [...logManager.logs.values()]
        } break

        case Events.InitEntries: {
          const result = AsEnumerable(data.entries)
            .GroupBy(d => d.category, v => v.name)
            .ToMap(d => d.key, v => new Set<string>(v))
        } break

        case Events.EntryAdded: {
          // TODO
        } break

        case Events.EntrySwapped: {
          returnValue.currentEntry = data.entryName
        } break
      }
    }

    return returnValue
  },

  computed: {
  },
  mounted () {

  }
})
</script>
