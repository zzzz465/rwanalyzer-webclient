import { ProfileLog } from './ProfileLog';
import { TickLog } from './TickLog';

interface Range {
  start: number
  end: number
}

/** describe chunk of N TickLogs, it's used to draw more simplified charts */
export class LogChunk implements Iterable<TickLog> {
  private _logs: TickLog[]

  hit: number
  time: number
  tick: Range

  constructor(
    public readonly profileLog: ProfileLog, 
    public readonly chunkSize: number,
    firstLog: TickLog) {
      if (chunkSize <= 0)
        throw new Error(`chunkSize is lower than 1, value: ${chunkSize}`)

      this._logs = []

      this.hit = 0
      this.time = 0
      this.tick = { start: firstLog.tick, end: firstLog.tick }

      this.appendLog(firstLog)
  }

  *[Symbol.iterator](): Iterator<TickLog, void, void> {
    for (const log of this._logs.values())
      yield log
  }

  isFull() {
    return this._logs.length >= this.chunkSize
  }

  appendLog(log: TickLog): void {
    if (this._logs.length >= this.chunkSize)
      throw new Error("LogChunk is full")

    this._logs.push(log)
    this.hit += log.hit
    this.time += log.time

    this.tick.end = log.tick
  }
}