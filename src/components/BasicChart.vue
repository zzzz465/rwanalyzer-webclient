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
import { LogChunk, Range } from '@/Logs/LogChunk'
import { AsEnumerable } from 'linq-es2015'
import { LogManager } from '@/Logs/LogManager'
import { line, scaleQuantize } from 'd3'

export default Vue.extend({
  props: {
    logManager: {
      type: LogManager,
      required: true
    },
    yAxisReference: { // which value will be used to draw y axis?
      type: String,
      default: 'time'
      // time | avgTime
    },
    range: { // show how many ticks?
      type: Number,
      default: 300
    }
  },

  watch: {
    yAxisReference () {
      this.paths.selectAll('path')
        .remove()
    }
  },

  computed: {
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

    const circle = svg.append('circle')
      .attr('stroke', 'red')
      .attr('stroke-width', '5')
      .attr('cx', '500')
      .attr('cy', '500')
      .attr('r', '8')
      .attr('fill', '#00000000')

    return {
      svg,
      xAxis,
      yAxis,
      paths,
      legend,
      rect,
      focusText,
      circle,
      mousePos: [0, 0] as number[],
      isHover: false,
      frameCounter: 0
    }
  },

  mounted () {
    const svgNode = this.svg.node()!;
    (this.$refs.graph as HTMLDivElement).append(svgNode)

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 80)

    const size = 5
    setInterval(() => {
      console.log(`framerate: ${this.frameCounter / size}`)
      this.frameCounter = 0
    }, 1000 * size)

    /*
    this.rect
      .on('mouseover', (event) => {
        console.log('mouseover')
      })
      .on('mousemove', (event) => {
        console.log('mousemove')
      })
*/

    this.rect
      .on('mouseover', (event) => this.mouseover(event))
      .on('mousemove', (event) => this.mousemove(event))
      .on('mouseleave', (event) => this.mouseleave(event))
  },

  methods: {
    getColor: d3.scaleOrdinal(d3.schemeSet3),

    updateGraph () {
      const logManager = this.logManager

      const range: Range = {
        start: Math.trunc((logManager.currentTick - this.range)),
        end: Math.trunc((logManager.currentTick - logManager.chunkSize))
      }
      const filteredLogs = this.logManager.profileLogs
        .map(pLog => {
          const filtered = AsEnumerable(pLog.chunks)
            .Where(c => range.start <= c.tick.start && c.tick.end <= range.end)
            .ToArray()

          return {
            label: pLog.label,
            key: pLog.key,
            filteredChunks: filtered
          }
        })

      const pLogs = filteredLogs

      if (pLogs.length <= 0) {
        this.paths
          .selectAll('path')
          .remove()
        return
      }

      const flattenChunks = AsEnumerable(filteredLogs)
        .Select(c => c.filteredChunks)
        .SelectMany(c => c)
        .ToArray()

      // make x function
      const x = (() => {
        // we need chunk start and chunk end
        const domain = [range.start, range.end]
        return d3.scaleLinear()
          .domain(domain)
          .range([30, 1250])
      })()

      // make y function
      const y = (() => {
        const max = d3.max(flattenChunks, c => this.getYValue(c)) || 0

        return d3.scaleLinear()
          .domain([0, max]).nice()
          .range([690, 30])
      })()

      // draw x axis
      this.xAxis.call(d3.axisTop(x))

      // draw y axis
      this.yAxis.call(d3.axisLeft(y))

      // make line function
      const line = d3.line<LogChunk>()
        // .curve(d3.curveBasis) // give line curve
        .x((d, i) => x(d.tick.start)!)
        .y(d => y(this.getYValue(d))!)

      // draw path
      const drawedPaths = this.paths
        .selectAll('path')
        .data(pLogs, (d: any) => d.key)
        .join(
          enter => enter
            .append('path')
            .attr('stroke', d => this.getColor(d.key))
            .attr('d', d => line(d.filteredChunks))
          ,
          update => update
            .attr('stroke', d => this.getColor(d.key))
            .attr('d', d => line(d.filteredChunks))
          ,
          exit => exit.remove()
        )

      if (this.isHover) { // hovering
        const xPos = this.mousePos[0]
        const yPos = this.mousePos[1]
        const tick = x.invert(xPos)
        const yVal = y.invert(yPos)
        const matchedLogs = []
        for (const log of filteredLogs) {
          const selectedChunk = log.filteredChunks.find(d => d.tick.start <= tick && tick <= d.tick.end)
          if (selectedChunk) {
            matchedLogs.push({
              profileLog: log,
              selectedChunk
            })
          }
        }

        const least = d3_array.least(matchedLogs, d => Math.abs(yVal - this.getYValue(d.selectedChunk)))
        if (least) {
          drawedPaths
            .attr('stroke', d => d.key === least.profileLog.key ? '#ff0000' : '#ffffff1f')
            .filter(d => d.key === least.profileLog.key).raise()

          this.circle
            .attr('cx', x(least.selectedChunk.tick.start)!)
            .attr('cy', y(this.getYValue(least.selectedChunk))!)
        }
      }

      this.frameCounter++
    },

    getYValue (data: { hit: number, time: number, chunkSize: number }) {
      if (this.yAxisReference === 'hit') { return data.hit } else { return data.time }
    },

    mouseover (event: any) {
      this.isHover = true
    },

    mousemove (event: any) {
      // this.mousePos =
      this.mousePos = d3.pointer(event)
    },

    mouseleave (event: any) {
      this.isHover = false
    }

  }
})
</script>
