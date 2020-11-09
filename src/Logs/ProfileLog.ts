import * as d3 from 'd3'
import Deque from 'double-ended-queue'
import { tickFormat } from 'd3'
import { LogChunk, Range } from './LogChunk'
import { TickLog } from './TickLog'

export class ProfileLog {
  private _tickLogs: TickLog[]
  private _logChunks: Deque<LogChunk>
  private readonly queueSize: number
  public get chunks() {
    return this._logChunks.toArray()
  }

  constructor(readonly label: string,
    readonly key: string,
    public readonly tickLogLimit = 10000,
    public readonly chunkSize = 10) {
      this._tickLogs = []
      this.queueSize = tickLogLimit / chunkSize
      this._logChunks = new Deque()
  }

  public appendLog(log: TickLog) {
    const range: Range = {
      start: log.tick - log.tick % this.chunkSize,
      end: log.tick - log.tick % this.chunkSize + this.chunkSize
    }

    const last = this._logChunks.peekBack()

    if (this._logChunks.length == 0 || (last && last.tick.end < log.tick)) {
      this._logChunks.push(new LogChunk(this, this.chunkSize, range))
    }

    this._logChunks.peekBack()!.appendLog(log)

    if (this._logChunks.length >= this.queueSize)
      this._logChunks.removeFront()
  }
}