<style lang="less" scoped>
  .root-FPSTPSChart {
    width: 100%;
    height: 100%;
    color: white;
  }
</style>

<template lang="pug">
  .root-FPSTPSChart(ref="root")
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

import { FPSTPSManager } from '../Logs/FPSTPSManager'
import { FPSTPS } from '@/Logs/LogDataReceiver'
import { clearIntervals } from '@/Utils/interval'

export default Vue.extend({
  props: {
    logManager: {
      type: FPSTPSManager,
      required: true
    }
  },

  computed: {

  },

  data () {
    const svg = d3.create('svg')
      .attr('width', 10)
      .attr('height', 10)

    const xAxis = svg.append('g')

    const yAxis = svg.append('g')

    const targetTPSLine = svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', '#FF0000')

    const tpsPath = svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', '#FFFFFF')

    return {
      svg,
      xAxis,
      yAxis,
      tpsPath,
      targetTPSLine,
      rootRectSize: [0, 0] as number[],
      updateKeys: [] as number[]
    }
  },

  mounted () {
    const rootNode = this.$refs.root as HTMLDivElement
    rootNode.append(this.svg.node()!)

    this.rootRectSize = [rootNode.offsetWidth, rootNode.offsetHeight]

    this.svg
      .attr('width', this.rootRectSize[0])
      .attr('height', this.rootRectSize[1])

    clearIntervals(this.updateKeys)

    this.updateKeys = [
      setInterval(() => {
        this.updateGraph()
      }, 100)
    ]
  },

  methods: {
    updateGraph () {
      const [width, height] = this.rootRectSize
      const margin = 40

      this.xAxis
        .attr('transform', `translate(${0}, ${height - margin / 2})`)

      this.yAxis
        .attr('transform', `translate(${margin}, ${0})`)

      const logManager = this.logManager
      const logs = logManager.logs

      // maximum value of y we want to display
      if (logs.length <= 0) return

      const targetTps = logs[logs.length - 1].tpsTarget
      const yMaxVal = Math.trunc(d3.max(logs, d => d.tpsTarget)! * 1.2)

      const x = d3.scaleLinear()
        .domain([0, logs.length - 1])
        .range([margin, width - margin])

      const y = d3.scaleLinear()
        .domain([0, yMaxVal])
        .range([height - margin, margin])

      // draw xAxis
      this.xAxis.call(d3.axisTop(x)
        .tickValues(x.ticks().filter(Number.isInteger))
        .tickFormat(d => d3.format('d')((logs.length - d.valueOf())))
      )

      // draw yAxis
      this.yAxis.call(d3.axisLeft(y))

      const tpsline = d3.line<FPSTPS>()
        .curve(d3.curveBasis)
        .x((d, i) => x(i)!)
        .y(d => y(d.tps)!)

      // draw tps line
      this.tpsPath
        .attr('d', tpsline(logs)!)

      // draw desired tps target line
      const line = d3.line<[number, number]>()
        .x(d => x(d[0])!)
        .y(d => y(d[1])!)

      this.targetTPSLine
        .attr('d', line([[0, targetTps], [logs.length - 1, targetTps]])!)

      // console.log(`width: ${width} height: ${height}`)
    }
  }
})
</script>
