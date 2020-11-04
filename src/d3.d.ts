import * as d3 from 'd3'
declare module 'd3' {
  /** @deprecated */
  function mouse(): void

  function pointer(target: any): [number, number]
}