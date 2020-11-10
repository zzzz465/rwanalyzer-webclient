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
        v-btn(@click="yAxisReference = 'hit'") change to hit
        v-btn(@click="yAxisReference = 'time'") change to time
        v-btn(@click="toggleTick") toggle Tick
      .top
        h3 current setting: {{ yAxisReference }}
      BasicChart.graph(
        :logManager="logManager"
        :yAxisReference="yAxisReference"
        )
</template>

<script lang="ts">
import Vue from 'vue'
import BasicChart from './components/BasicChart.vue'
import Tab from './components/Tab/TabContainer.vue'
import { AsEnumerable } from 'linq-es2015'
import { LogManager } from './Logs/LogManager'
import { Events, WebSocketClient, MockLogDataReceiver, iLogDataReceiver } from './Logs/LogDataReceiver'
import { ProfileLog } from './Logs/ProfileLog'
import Deque from 'double-ended-queue'
import * as d3 from 'd3'

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
    const logManager = new LogManager(1000, 3)

    // const webSocketClient = new WebSocketClient()

    const mockLogDataReceiver = new MockLogDataReceiver(10)

    // change this
    // const iLog: iLogDataReceiver = webSocketClient
    const iLog: iLogDataReceiver = mockLogDataReceiver
    mockLogDataReceiver.Start()

    const returnValue = {
      logManager,
      tick: 0,
      tabs: new Map<string, Set<string>>(),
      currentEntry: '',
      logs: [] as ProfileLog[],
      yAxisReference: 'avgTime',
      dataReceiver: iLog
    }

    iLog.onDataReceive = (data) => {
      switch (data.type) {
        case Events.LogData: {
          logManager.processData(data)
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
  },
  methods: {
    toggleTick () {
      this.dataReceiver.sendMessage({
        type: Events.toggleTickState
      })
    }
  }
})
</script>
