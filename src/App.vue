<style>
  .root {
    width: 1600px;
    height: 900px;
  }
</style>

<template lang="pug">
  .root(ref="frame")
    svg.d3frame
    .d3test
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import * as d3 from 'd3'

interface Records {
  key: string
  label: string
  calls: number[]
  total: number[]
};

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  },

  data () {
    return {
      dict: new Map<string, Records>()
    }
  },

  mounted () {
    const socket = new WebSocket('ws://localhost:4000/Example')
    socket.onopen = (event) => {
      console.log('connected')
      setInterval(() => {
        socket.send('request')
      }, 50)
      // socket.send
    }

    const draw = () => {
      const data = {
        arr: [] as any[]
      }

      for (let i = 0; i < 10; i++) {
        const n = Math.floor(Math.random() * 100)
        const obj = {
          key: `${n} obj`,
          label: `${n} label`
        }

        data.arr.push(obj)
      }

      const svg = d3.select('.d3test')
        .append('div')

      svg.selectAll('div')
        .data(data.arr, (d: any) => d.key)
        .join(
          enter => enter.call(() => console.log('enter'))
            .append('div')
            .text(d => d.label),
          update => update.call(function () { console.log('update') }),
          exit => exit.remove()
        )
    }

    // draw()
    // setInterval(draw, 50)

    const testRecord: Records = {
      key: 'asdf',
      label: 'asdfLabel',
      calls: [],
      total: []
    }
    // this.dict.set('asdf', testRecord)
    // for (let i = 0; i < 50; i++) { // mock Data
    // testRecord.calls.push(i)
    // }

    const svg = d3.select<SVGSVGElement, unknown>('.d3frame')
      .attr('width', 1280)
      .attr('height', 720)

    const x = d3.scaleLinear()
      .domain([0, 50])
      .range([30, 1270])

    /*
    const y = d3.scaleLinear()
      .domain([0, d3.max([...this.dict.values()], d => d3.max(d.calls))])
      .range([20, 680])
    */

    const xAxis = svg.append('g')
      .attr('transform', 'translate(0, 700)')
      .call(d3.axisBottom(x))

    const yAxis = svg.append('g')
      .attr('transform', 'translate(30, 0)')
      // .call(d3.axisLeft(y))

    const path = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
    // .attr('d', (data) => {
    // console.log(data)
    // return line(data.calls)
    // })

    // const data2 = [1, 2, 3, 4, 5]
    /*
    setInterval(() => {
      testRecord.calls.push(Math.floor(Math.random() * 50))
      testRecord.calls.shift()

      path
        .selectAll('path')
        .data([...this.dict.values()], (datum: any) => datum.key)
        .join(
          enter => enter.append('path')
            .attr('d', d => line(d.calls)),
          update => update
            .attr('d', d => line(d.calls))
          ,
          exit => exit.remove()
        )

    }, 30)
    */

    socket.onmessage = (ev) => {
      const xLen = 50 // 가로 길이

      const data = JSON.parse(ev.data)
      for (const value of data) {
        if (this.dict.has(value.key)) {
          const record = this.dict.get(value.key) as Records
          record.calls.push(value.calls)
          record.total.push(value.total)
          if (record.calls.length > 50) { record.calls.shift() }
          if (record.total.length > 50) { record.total.shift() }
        } else {
          const record: Records = { key: value.key, label: value.label, calls: [value.calls], total: [value.total] }
          this.dict.set(value.key, record)
        }
      }

      const y = d3.scaleLinear()
        .domain([0, d3.max([...this.dict.values()], d => d3.max(d.total))!]).nice()
        .range([680, 20])

      const line = d3.line<number>()
        .x((d, i) => x(i)!)
        .y((d, i) => y(d)!)

      // console.log(d3.max([...this.dict.values()], d => d3.max(d.calls)))
      yAxis.call(d3.axisLeft(y))

      const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'cyan'
      ]

      const randColor = (obj: any) => {
        const selected = colors[Math.floor((Math.random() * 100)) % colors.length]
        console.log(`selected color: ${selected}`)
        return selected
      }

      path
        .selectAll('path')
        .data([...this.dict.values()], (datum: any) => datum.key)
        .join(
          enter => enter.append('path')
            .attr('stroke', d => randColor(d))
            .attr('d', d => line(d.total)),
          update => update
            .attr('d', d => line(d.total)),
          exit => exit.remove()
        )
    }
  }
})
</script>
