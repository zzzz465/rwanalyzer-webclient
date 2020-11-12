<style lang="less" scoped>
  .background {
    display: flex;
    background-color: RGB(40, 40, 40);
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
  }
  .root {
    display: flex;
    width: 95%;
    height: 90%;
  }
  .left {
    flex: 1;
    background-color:  #151F29;
  }
  .main {
    flex: 6;
    display: flex;
  }
  .tab {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: scroll;
  }
  .border {
    margin: 12px;
    border: solid;
    border-color: RGB(60, 60, 60);
  }
  .content {
    flex: 4;
    background-color: #00161D;
    display: flex;
    flex-direction: column;

    .list {
      flex: 10;
      background-color: #151F29;
      overflow: auto;
    }

    .graph {
      flex: 6;
      background-color: #151F29;
    }

    .tickGraph {
      flex: 3;
      background-color: #151F29;
    }
  }
  .optional {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color:  #00161D;
  }
  .information-panel {
    flex: 5;
  }
  .control-panel {
    flex: 4;
  }
  .FPSTPS {
    flex: 2;
    background-color: #151F29;
  }
</style>

<template lang="pug">
  .background
    .root
      .left
        Tab(:items="entries" :currentEntry="currentEntry")
      .main
        .content
          .list.border
            ProfileTable(
              :logManager="logManager"
              :selected="selectedEntries"
            )
          .graph.border
            BasicChart(
              :logManager="logManager"
              :range="500"
            )
          .tickGraph.border
            TPSChart(
              :tpsLogManager="tpsLogManager"
            )
        .optional
          .information-panel
          .control-panel
          FPSTPSChart.FPSTPS.border(
            :logManager="fpstpsLogManager"
          )
</template>

<script lang="ts">
import Vue from 'vue'
import BasicChart from './components/BasicChart.vue'
import Tab from './components/Tab/TabContainer.vue'
import ProfileTable from './components/ProfileTable.vue'
import TPSChart from './components/TPSChart.vue'
import FPSTPSChart from './components/FPSTPSChart.vue'
import { AsEnumerable } from 'linq-es2015'
import { LogManager } from './Logs/LogManager'
import { Events, WebSocketClient, MockLogDataReceiver, iLogDataReceiver } from './Logs/LogDataReceiver'
import { ProfileLog } from './Logs/ProfileLog'
import { TPSLogManager } from './Logs/TPSLog'
import Deque from 'double-ended-queue'
import * as d3 from 'd3'
import { FPSTPSManager } from './Logs/FPSTPSManager'

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
    TPSChart,
    Tab,
    ProfileTable,
    FPSTPSChart
  },
  data () {
    const logLimit = 1000
    const chunkSize = 3
    const logManager = new LogManager(logLimit, chunkSize)
    const tpsLogManager = new TPSLogManager(logLimit, chunkSize)

    const webSocketClient = new WebSocketClient()

    // const mockLogDataReceiver = new MockLogDataReceiver(10)

    // change this
    const iLog: iLogDataReceiver = webSocketClient
    // const iLog: iLogDataReceiver = mockLogDataReceiver
    // mockLogDataReceiver.Start()

    const fpstpsLogManager = new FPSTPSManager()
    const selectedEntries = new Set<string>()

    const returnValue = {
      logManager,
      tpsLogManager,
      fpstpsLogManager,
      tick: 0,
      tabs: new Map<string, Set<string>>(),
      currentEntry: '',
      entries: new Map<string, Set<string>>(),
      logs: [] as ProfileLog[],
      yAxisReference: 'avgTime',
      dataReceiver: iLog,
      selectedEntries
    }

    iLog.onDataReceive = (data) => {
      switch (data.type) {
        case Events.LogData: {
          logManager.processData(data)
          tpsLogManager.processData(data)
        } break

        case Events.InitEntries: {
          const result = AsEnumerable(data.entries)
            .GroupBy(d => d.category, v => v.name)
            .ToMap(d => d.key, v => new Set<string>(v))
          returnValue.entries = result
        } break

        case Events.EntryAdded: {
          // TODO
        } break

        case Events.EntrySwapped: {
          returnValue.currentEntry = data.entryName
        } break

        case Events.FPSTPS: {
          fpstpsLogManager.appendLog(data)
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
