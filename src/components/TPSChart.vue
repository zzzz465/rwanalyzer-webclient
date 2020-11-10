<style lang="scss" scoped>

</style>

<template lang="pug">
  .graph(ref="graph")
</template>

<script lang="ts">
import { LogManager } from '@/Logs/LogManager'
import { TPSLogManager } from '@/Logs/TPSLog'
import { AsEnumerable } from 'linq-es2015'
import Vue from 'vue'
import * as d3 from 'd3'

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

  data() {
    const svg = d3.create('svg')
      .attr('width', 0)
      .attr('height', 0)

    const xAxis = svg.append('g')
      .attr('color', 'white')
      .style('font', '20px times')

    const yAxis = svg.append('g')
      .attr('color', 'white')
      .attr('font', '18px times')

    const tpsPath = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')

    return {
      svg, xAxis, yAxis, tpsPath,
      rootRectSize: [0, 0] // [width, height]
    }
  },

  mounted() {
    const svgNode = this.svg.node()!
    const rootNode = this.$refs.graph as HTMLDivElement
    rootNode.append(svgNode)

    this.rootRectSize = [rootNode.offsetWidth, rootNode.offsetHeight]
    this.svg
      .attr('width', this.rootRectSize[0])
      .attr('height', this.rootRectSize[1])

    setInterval(() => {
      this.updateGraph()
    }, 1000 / 80)
  },

  methods: {
    updateGraph () {
    }
  }
})
</script>
