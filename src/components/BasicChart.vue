<style scoped>
  .graphRoot {
    width: 100%;
    height: 100%;
    background-color: RGB(60, 60, 60);
  }
</style>

<template lang="pug">
  .graphRoot
    .graph(ref="graph")
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import { selectAll, tree } from 'd3'
import { ProfileLog } from '@/Logs/ProfileLog'
import { TickLog } from '@/Logs/TickLog'
import { LogChunk } from '@/Logs/LogChunk'

export default Vue.extend({
  props: {
    logs: {
      type: Array,
      required: true
    },
    lastTick: {
      type: Number,
      required: true
    },
    tickPerScreen: {
      type: Number,
      required: true
    },
    resolution: {
      type: Number,
      required: true
    },
    yAxisReference: { // which value will be used to draw y axis?
      type: String,
      default: 'time'
      // time | avgTime
    }
  },

  watch: {
    // lastTick () {
      // if (this.lastTick % 10 === 0)
        // this.updateGraph()
    // },
    yAxisReference () {
      this.paths.selectAll('path')
        .remove()
    }
  },

  data () {
    const svg = d3.create('svg')
      .attr('width', 1920)
      .attr('height', 720)

    svg.node()

    const legend = svg.append('g')
      .attr('transform', 'translate(1280, 100)')

    const xAxis = svg.append('g')
      .attr('transform', 'translate(0, 700)')
      .attr('color', 'white')
      .style('font', '20px times')

    const yAxis = svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .attr('color', 'white')
      .style('font', '18px times')

    const paths = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')

    return {
      svg,
      xAxis,
      yAxis,
      paths,
      legend,
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'cyan'
      ]
    }
  },

  mounted () {
    const svgNode = this.svg.node()!;
    (this.$refs.graph as HTMLDivElement).append(svgNode)

    this.drawXAxis()

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 60)
  },

  methods: {
    getColor: d3.scaleOrdinal(d3.schemeSet3),

    updateGraph () {
      const logs = this.logs as ProfileLog[]

      this.text(logs)

      if(this.lastTick % 10 === 0)
        console.log(logs[0])

      if (logs.length > 0) {
        const line = this.line(this.x(), this.y(logs))

        this.paths
          .selectAll('path')
          .data(logs, (data: any) => data.key)
          .join(
            enter => enter
              .append('path')
              .attr('stroke', d => this.getColor(d.key))
              .attr('d', d => line(d.logs)),
            update => update
              .attr('d', d => line(d.logs)),
            exit => exit.remove()
          )

        this.drawXAxis()
        this.drawYAxis(logs)
      } else {
        this.paths
          .selectAll('path')
          .remove()
      }
    },

    drawXAxis () {
      this.xAxis.call(d3.axisTop(this.x()))
    },

    drawYAxis (logs: ProfileLog[]) {
      this.yAxis.call(d3.axisLeft(this.y(logs)))
    },

    x () {
      const min = Math.max(0, this.lastTick - this.tickPerScreen)
      const domain = [min, this.lastTick]

      return d3.scaleLinear()
        .domain(domain)
        .range([30, 1250]) // padding 30 each side
    },

    y (logs: ProfileLog[]) {
      let max: number
      if (this.yAxisReference === 'time') {
        max = d3.max(logs, d => d3.max(d.logs, inner => inner.time))!
      } else { // default: time
        max = d3.max(logs, d => d3.max(d.logs, inner => inner.time / inner.chunkSize))!
      }

      return d3.scaleLinear()
        .domain([max, 0]).nice()
        .range([30, 690]) // padding 30 each side
    },

    line (x: d3.ScaleLinear<number, number>, y: d3.ScaleLinear<number, number>) {
      const a = d3.line<LogChunk>()
        .x((d, i) => x(d.tick.start)!)

      if (this.yAxisReference === 'time')
        return a.y((d, i) => y(d.time)!)
      else
        return a.y((d, i) => y(d.time / d.chunkSize)!)
    },

    text (logs: ProfileLog[]) {
      this.legend
        .selectAll('text')
        .data(logs)
        .join('text')
        .attr('fill', d => this.getColor(d.key))
        .attr('y', (d, i) => i * (25))
        .text(d => d.label)
    },
  }
})
</script>
