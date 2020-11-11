import * as d3 from 'd3'
import Deque from 'double-ended-queue'
import { tickFormat } from 'd3'
import { LogChunk, Range } from './LogChunk'
import { TickLog } from './TickLog'

export class ProfileLog {
  private _logChunks = new Deque<LogChunk>()
  private readonly queueSize: number
  // private _max = 0
  private _average = 0
  private _total = 0
  private _hits = 0
  public get chunks() { return this._logChunks.toArray() }
  get average() { return this._average } // average spend time
  // get max() { return this._max } // max time
  get total() { return this._total } // total time
  get hits() { return this._hits } // total hit

  constructor(readonly label: string,
    readonly key: string,
    public readonly tickLogLimit = 10000,
    public readonly chunkSize = 10) {
      this.queueSize = Math.floor(tickLogLimit / chunkSize)
  }

  public appendLog(log: TickLog) {
    const range: Range = {
      start: log.tick - log.tick % this.chunkSize,
      end: log.tick - log.tick % this.chunkSize + this.chunkSize
    }

    const last = this._logChunks.peekBack()

    if (this._logChunks.length == 0 || (last && last.tick.end < log.tick)) {
      this.updateData()
      this._logChunks.push(new LogChunk(this, this.chunkSize, range))
    }

    this._logChunks.peekBack()!.appendLog(log)

    if (this._logChunks.length >= this.queueSize)
      this._logChunks.removeFront()
  }

  private updateData() {
    if (this._logChunks.length === 0) return
    if (this._logChunks.length === this.queueSize - 1) {
      const first = this._logChunks.peekFront()!
      const last = this._logChunks.peekBack()!
      this._total = this._total - first.time + last.time
      this._hits = this._hits - first.hit + last.hit
    } else {
      const last = this._logChunks.peekBack()!
      this._total += last.time
      this._hits += last.hit
    }

    this._average = this.total / this._logChunks.length * this.chunkSize
  }
}