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
import { ProfileLog, TickLog } from '../DataReceiver'
import * as d3 from 'd3'
import { selectAll, tree } from 'd3'

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
    }
  },

  watch: {
    lastTick () {
      this.updateGraph()
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

    const yAxis = svg.append('g')
      .attr('transform', 'translate(30, 0)')

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
  },

  methods: {
    getColor: d3.scaleOrdinal(d3.schemeSet3),

    updateGraph () {
      const logs = this.logs as ProfileLog[]

      this.text(logs)

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
      const max = d3.max(logs, d => d3.max(d.logs, inner => inner.time))!

      return d3.scaleLinear()
        .domain([max, 0]).nice()
        .range([30, 690]) // padding 30 each side
    },

    line (x: d3.ScaleLinear<number, number>, y: d3.ScaleLinear<number, number>) {
      return d3.line<TickLog>()
        .x((d, i) => x(d.tick)!)
        .y((d, i) => y(d.time)!)
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
