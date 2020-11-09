import * as d3 from 'd3'
import Deque from 'double-ended-queue'
import { tickFormat } from 'd3'
import { LogChunk, Range } from './LogChunk'
import { TickLog } from './TickLog'

export class ProfileLog {
  private _tickLogs: TickLog[]
  private _logChunks: Deque<LogChunk>
  private readonly chunkArraySize: number
  private _cachedChunks: LogChunk[]
  color: string | null
  public get chunks() {
    return this._cachedChunks
  }

  constructor(readonly label: string,
    readonly key: string,
    public readonly tickLogLimit = 10000,
    public readonly chunkSize = 10) {
      this._tickLogs = []
      this.chunkArraySize = tickLogLimit / chunkSize
      this._logChunks = new Deque()
      this._cachedChunks = []
      this.color = null

      for (let i = 0; i < this.chunkArraySize; i++) {
        const range: Range = {
          start: i,
          end: i * chunkSize
        }
        const chunk = new LogChunk(this, chunkSize, range)
        this._logChunks.enqueue(chunk)
      }
  }

  public appendLog(log: TickLog) {
    let index = this.getIndex(log)
    if (index < 0) return // old data -> discard
    if (index >= this.chunkArraySize) {
      let diff = index - (this.chunkArraySize - 1) // shift array
      while (diff-- > 0)
        this._logChunks.shift()
      const range: Range = {
        start: log.tick / this.chunkSize,
        end: log.tick / this.chunkSize + 1
      }
      this._logChunks.push(new LogChunk(this, this.chunkSize, range))
      index = this.getIndex(log)
    }

    this._logChunks.get(index)!.appendLog(log)

    this._cachedChunks = this._logChunks.toArray()
  }

  private getIndex(log: TickLog): number {
    const first = this._logChunks.peekFront()!.tick.start
    const index = Math.trunc((log.tick / this.chunkSize) - first)
    return index
  }
}