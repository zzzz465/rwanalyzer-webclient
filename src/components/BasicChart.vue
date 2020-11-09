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
import { line } from 'd3'

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
      mousePos: [] as number[],
      frameCounter: 0
    }
  },

  mounted () {
    const svgNode = this.svg.node()!;
    (this.$refs.graph as HTMLDivElement).append(svgNode)

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 120)

    setInterval(() => {
      console.log(`framerate: ${this.frameCounter}`)
      this.frameCounter = 0
    }, 1000)

/*
    this.rect
      .on('mouseover', (event) => {
        console.log('mouseover')
      })
      .on('mousemove', (event) => {
        console.log('mousemove')
      })
*/

    /*
    this.rect
      .on('mouseover', function () {
        console.log(`mouseover on rectElement`)
      })
      .on('mousemove', (event) => this.mouseMove(event))
    */
  },

  methods: {
    updateGraph () {
      const logManager = this.logManager
      const range: Range = {
        start: Math.trunc((logManager.currentTick - this.range) / logManager.chunkSize),
        end: Math.trunc((logManager.currentTick - logManager.chunkSize) / logManager.chunkSize)
      }
      const filteredLogs = this.logManager.profileLogs
        .map(pLog => {
          const filtered = AsEnumerable(pLog.chunks)
            .Where(c => range.start <= c.tick.start && c.tick.end <= range.end)
            .ToArray()

          return {
            ...pLog,
            original: pLog,
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

      console.log(`lasttick: ${logManager.currentTick} maxVal: ${d3_array.max(flattenChunks, d => d.tick.start)}`)

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
        let max = 0
        switch (this.yAxisReference) {
          case 'time':
            max = d3.max(flattenChunks, c => c.time) || 0
            break
          case 'avgTime':
            max = d3.max(flattenChunks, c => c.time / c.chunkSize) || 0
            break
        }

        return d3.scaleLinear()
          .domain([max, 0]).nice()
          .range([30, 690])
      })()

      // draw x axis
      this.xAxis.call(d3.axisTop(x))

      // draw y axis
      this.yAxis.call(d3.axisLeft(y))

      // make line function
      const line = (() => {
        const line = d3.line<LogChunk>()
          .curve(d3.curveBasis) // give line curve
          .x((d, i) => x(d.tick.start)!)

        if (this.yAxisReference === 'time') { return line.y((d, i) => y(d.time)!) } else { return line.y((d, i) => y(d.time / d.chunkSize)!) }
      })()

      // draw path
      this.paths
        .selectAll('path')
        .data(pLogs, (d: any) => d.key)
        .join(
          enter => enter
            .append('path')
            .attr('stroke', d => d.color)
            .attr('d', d => line(d.filteredChunks))
          ,
          update => update
            .attr('stroke', d => d.color)
            .attr('d', d => line(d.filteredChunks))
          ,
          exit => exit.remove()
        )

      this.frameCounter++
    },

    mouseover() {

    },

    mousemove() {

    },
    
    mouseleave() {

    }

  }
})
</script>
