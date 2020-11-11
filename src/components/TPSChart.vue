<style>
  .graph {
    width: 100%;
    height: 100%;
  }
  .tpsPath {
    fill: none;
    stroke: white;
    stroke-width: 2;
  }
  .area {
    fill: url(#area_gradient);
  }
</style>

<template lang="pug">
  .graph(ref="graph")
</template>

<script lang="ts">
import { LogManager } from '@/Logs/LogManager'
import { TPSLogChunk, TPSLogManager } from '@/Logs/TPSLog'
import { AsEnumerable } from 'linq-es2015'
import Vue from 'vue'
import * as d3 from 'd3'
import { Range } from '@/Logs/LogChunk'

export default Vue.extend({
  props: {
    tpsLogManager: {
      type: TPSLogManager,
      required: true
    },
    range: {
      type: Number,
      default: 300
    }
  },

  data () {
    const svg = d3.create('svg')
      .attr('width', 0)
      .attr('height', 0)

    const xAxis = svg.append('g')
      .attr('color', 'white')
      .style('font', '20px times')

    const yAxis = svg.append('g')
      .attr('color', 'white')
      .attr('font', '18px times')

    const tpsPath = svg.append('path')
      .attr('class', 'tpsPath')
      // .attr('fill', 'none')
      // .attr('stroke', 'steelblue')
      // .attr('stroke-width', 1.5)
      // .attr('stroke-linejoin', 'round')
      // .attr('stroke-linecap', 'round')
      // .attr('stroke', '#dddddd')

    const area = svg.append('path')
      .attr('class', 'area')

    const defs = svg.append('defs')

    const area_gradient = defs.append('linearGradient')
      .attr('id', 'area_gradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'green' },
        { offset: '100%', color: 'red' }
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)

    return {
      svg,
      xAxis,
      yAxis,
      tpsPath,
      area,
      rootRectSize: [0, 0] // [width, height]
    }
  },

  mounted () {
    const svgNode = this.svg.node()!
    const rootNode = this.$refs.graph as HTMLDivElement
    rootNode.append(svgNode)

    this.rootRectSize = [rootNode.offsetWidth, rootNode.offsetHeight]
    this.svg
      .attr('width', this.rootRectSize[0])
      .attr('height', this.rootRectSize[1])

    console.log(`rect size: ${this.rootRectSize}`)

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 80)
  },

  methods: {
    updateGraph () {
      const range: Range = {
        start: this.tpsLogManager.currentTick - this.range,
        end: this.tpsLogManager.currentTick
      }
      const filteredLogs = AsEnumerable(this.tpsLogManager.logChunks)
        .Where(d => range.start <= d.tickRange.start && d.tickRange.end <= range.end)
        .ToArray()

      const [width, height] = this.rootRectSize
      const margin = 40

      this.xAxis
        .attr('transform', `translate(${0}, ${height - margin / 2})`)

      this.yAxis
        .attr('transform', `translate(${margin}, ${0})`)

      if (filteredLogs.length <= 0) {
        this.tpsPath
          .selectAll('path')
          .remove()
        return
      }

      const x = d3.scaleLinear()
        .domain([range.start, range.end])
        .range([margin, width - margin])

      const y = d3.scaleLinear()
        .domain([0, 1]).nice()
        .range([height - margin, margin])

      this.xAxis.call(d3.axisTop(x).tickValues([]))
      this.yAxis.call(d3.axisLeft(y).ticks(1))

      const area = d3.area<TPSLogChunk>()
        .x(d => x(d.tickRange.start)!)
        .y0(y(0)!)
        .y1(d => y(d.percentage)!)

      const line = d3.line<TPSLogChunk>()
        .x((d) => x(d.tickRange.start)!)
        .y((d) => y(d.percentage)!)

      this.tpsPath
        .attr('d', line(filteredLogs)!)

      this.area
        .attr('d', area(filteredLogs)!)
    }
  }
})
</script>
