<style lang="scss" scoped>
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
    background-color: RGB(100, 100, 100);
    width: 95%;
    height: 90%;
  }
  .left {
    flex: 1;
    background-color: RGB(80, 80, 80);
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
  .content {
    flex: 4;
    background-color: #00161D;
    display: flex;
    flex-direction: column;

    .border {
      margin: 12px;
      border: solid;
      border-color: RGB(60, 60, 60);
    }

    .list {
      flex: 10;
      background-color: #151F29;
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
    background-color: RGB(120, 120, 120);
  }
</style>

<template lang="pug">
  .background
    .root
      .left
        // Tab(:name="logManager.")
      .main
        .content
          .list.border
          .graph.border
            BasicChart(
              :logManager="logManager"
              :range="500"
            )
          .tickGraph.border
        .optional
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
