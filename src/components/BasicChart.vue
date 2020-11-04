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
import * as d3_array from 'd3-array'
import { ProfileLog } from '@/Logs/ProfileLog'
import { TickLog } from '@/Logs/TickLog'
import { LogChunk } from '@/Logs/LogChunk'
import { AsEnumerable } from 'linq-es2015'

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

  computed: {
    filteredLogs () {
      const logs = this.logs as ProfileLog[]
      const filtered = logs.map(log => {
        const copy = Object.assign({}, log);
        (<any>copy).logs = log.logs.filter((d) => (this.lastTick - d.tick.end < this.tickPerScreen - 10)) // magic number, delete later
        copy.logs.pop()
        return copy
      })

      return filtered
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

    const rect = svg.append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', 1920)
      .attr('height', 720)

    const focusText = svg.append('g')
      .append('text')
        .style('opacity', 0)
        .attr('text-anchor', 'left')
        .attr('alignment-baseline', 'middle')

    return {
      svg,
      xAxis,
      yAxis,
      paths,
      legend,
      rect,
      focusText,
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'cyan'
      ],
      mousePos: [] as number[]
    }
  },

  mounted () {
    const svgNode = this.svg.node()!;
    (this.$refs.graph as HTMLDivElement).append(svgNode)

    this.drawXAxis()

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 60)

    const mousemove = this.mouseMove

    this.rect
      .on('mouseover', function () {
        console.log(`mouseover on rectElement`)
      })
      .on('mousemove', function () {
        mousemove(this)
      })
  },

  methods: {
    getColor: d3.scaleOrdinal(d3.schemeSet3),

    updateGraph () {
      const logs = this.filteredLogs

      this.text(logs)

      if (logs.length > 0) {
        // const line = this.line(this.x(), this.y(logs))
        const line = this.line(this.x(), this.y())

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
      // this.yAxis.call(d3.axisLeft(this.y(logs)))
      this.yAxis.call(d3.axisLeft(this.y()))
    },

    x () {
      const min = Math.max(0, this.lastTick - this.tickPerScreen)
      const domain = [min, this.lastTick]

      return d3.scaleLinear()
        .domain(domain)
        .range([30, 1250]) // padding 30 each side
    },

    // y (logs: ProfileLog[]) {
    y () {
      const logs = this.filteredLogs
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
        .curve(d3.curveBasis)
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

    mouseOver() {
      this.focusText.style('opacity', 1)
    },

    mouseMove(rect: SVGRectElement) {
      console.log(d3)
      const pos = d3.mouse(rect)
      const targetTick = this.x().invert(pos[0])
      const chunks = this.filteredLogs.map(log => {
        return {
          log,
          least: d3_array.least(log.logs, chunk => Math.abs(chunk.tick.start - targetTick))
        }
      }).filter(c => !!c.least)

      let targetProfileLog: ProfileLog | undefined = undefined
      
      console.log('mouseMove')

      switch (this.yAxisReference) {
        case 'time': {
          targetProfileLog = d3_array.least(chunks, chunk => chunk.least!.time)?.log
        } break

        case 'avgTime': {
          targetProfileLog = d3_array.least(chunks, chunk => chunk.least!.time / chunk.least!.chunkSize)?.log
        } break
      }

      if (targetProfileLog) {
        this.paths
          .selectAll('path')
          .data(this.filteredLogs)
          .join('path')
          .attr('stroke', profile => profile === targetProfileLog ? null : '#ddd')
            .filter(d => d === targetProfileLog).raise()
      }

    },
    
    mouseOut() {

    }
  }
})
</script>
