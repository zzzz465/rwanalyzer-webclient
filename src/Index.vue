<style>
  .root {
    display: flex;
    /* background-color: gray; */
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    width: 1680px;
    height: 1050px;
  }
  .left {
    flex: 1;
  }
  .right {
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
    .right
      .top
      BasicChart.graph(
        :logs="dataReceiver.logs"
        :lastTick="tick"
        :tickPerScreen="300"
        :resolution="100"
        )
</template>

<script lang="ts">
import Vue from 'vue'
import BasicChart from './components/BasicChart.vue'
import { DataReceiver, Events, ProfileLog, TickLog } from './DataReceiver'

export default Vue.extend({
  components: {
    BasicChart
  },
  data () {
    const dataReceiver = new DataReceiver()
    return {
      dataReceiver,
      tick: 0
    }
  },

  computed: {
  },
  mounted () {
    // test code

    const DEBUG = true // set true to debug mode.
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
