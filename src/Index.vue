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

    .information-panel {
      flex: 5;
    }
    .control-panel {
      flex: 2;
    }
    .FPSTPS {
      margin: 12px;
      flex: 2;
      background-color: #151F29;
    }
  }
</style>

<style>
  .el-loading-text {
    /* color: blue !important; */
    font-size: 15px !important;
  }
</style>

<template lang="pug">
  .background(
    v-loading.fullscreen.lock="connection.connecting"
    element-loading-background="rgba(0, 0, 0, 0.88)"
    element-loading-spinner="el-icon-loading"
    :element-loading-text="connectionText"
    customClass="loadingScreen"
  )
    .root
      .left
        Tab(:items="entries" v-model="currentEntry")
      .main
        .content
          .list.border
            ProfileTable(
              :logManager="logManager"
              :selected="selectedEntries"
              @rowSelected="rowSelected"
              @nameSelected="requestRichInfo"
            )
          .graph.border
            BasicChart(
              :logManager="logManager"
              :range="500"
              :selection="selectedEntries"
            )
          .tickGraph.border
            TPSChart(
              :tpsLogManager="tpsLogManager"
              :range="500"
            )
        .optional
          .information-panel
            RichInfoViewer(:richInfo="richInfo")
          .control-panel
          .FPSTPS.border
            FPSTPSChart(
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
import RichInfoViewer from './components/RichInfoViewer.vue'
import { AsEnumerable } from 'linq-es2015'
import { LogManager } from './Logs/LogManager'
import { Events, WebSocketClient, MockLogDataReceiver, iLogDataReceiver, GeneralInformation } from './Logs/LogDataReceiver'
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
    FPSTPSChart,
    RichInfoViewer
  },
  data () {
    const logLimit = 1000
    const chunkSize = 3
    const logManager = new LogManager(logLimit, chunkSize)
    const tpsLogManager = new TPSLogManager(logLimit, chunkSize)

    const webSocketClient = new WebSocketClient()

    // const mockLogDataReceiver = new MockLogDataReceiver(10)

    // change this

    // const iLog: iLogDataReceiver = webSocketClient
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
      socketClient: webSocketClient,
      richInfo: {} as GeneralInformation,
      selectedEntries,
      connection: {
        connecting: true,
        retryCount: 0
      }
    }

    webSocketClient.onDataReceive = (data) => {
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
          selectedEntries.clear()
          logManager.clearLogs()
          tpsLogManager.clearLogs()
          console.log(data)
        } break

        case Events.FPSTPS: {
          fpstpsLogManager.appendLog(data)
        } break

        case Events.RichInfoRespond: {
          console.log(data)
          returnValue.richInfo = data.Data
        } break
      }
    }

    return returnValue
  },

  watch: {
    'socketClient._status' (value: 'connected' | 'connecting' | 'disconnected'): void {
      switch (value) {
        case 'connected':
          this.connection.connecting = false
          this.connection.retryCount = -1
          break

        case 'connecting':
          this.connection.connecting = true
          break

        case 'disconnected':
          this.connection.connecting = false
          this.connection.retryCount += 1
          this.socketClient.reconnect()
          break
      }
    }
  },

  computed: {
    connectionText (): string {
      const texts = ['connecting to local server...']
      if (this.connection.retryCount > 0)
        texts.push(`retry count: ${this.connection.retryCount}`)

      return texts.join('\n')
    }
  },
  mounted () {

  },
  methods: {
    toggleTick () {
      this.socketClient.sendMessage({
        type: Events.toggleTickState
      })
    },

    requestRichInfo(log: ProfileLog): void {
      this.socketClient.sendMessage({
        type: Events.RichInfoRequest,
        key: log.key
      })
    },

    rowSelected (row: ProfileLog): void {
      const set = this.selectedEntries
      if (set.has(row.key))
        set.delete(row.key)
      else
        set.add(row.key)
    }
  }
})
</script>
