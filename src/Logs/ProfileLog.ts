import { LogChunk } from './LogChunk'
import { TickLog } from './TickLog'

export class ProfileLog {
  private readonly _tickLogs: TickLog[]
  private chunkSize: number
  private logChunkArrSize: number
  readonly label: string
  readonly key: string
  readonly logs: LogChunk[]

  constructor(label: string, key: string, public logLimit = 500, chunkSize = 10) {
    this.label = label
    this.key = key
    this._tickLogs = []
    this.logs = []
    this.chunkSize = chunkSize
    this.logChunkArrSize = 2000
    // this.logChunkArrSize = Math.floor(logLimit / chunkSize) + 1
  }

  public appendLog(log: TickLog) {
      this._tickLogs.push(log)
      if (this._tickLogs.length > this.logLimit)
          this._tickLogs.shift()

      // remove old chunks
      this.insertLogIntoChunk(log)
  }

  setChunkSize(size: number) {
    if (size <= 0) size = 1
    this.chunkSize = size
  }

  private insertLogIntoChunk(log: TickLog): void {
    // javascript returns undefined when out of index??? WTF what a great language
    let last = this.logs[this.logs.length - 1]
    if (last == undefined || last.isFull()) {
      last = new LogChunk(this, this.chunkSize, log)
      this.logs.push(last)

      if (this.logs.length > this.logChunkArrSize)
        this.logs.shift()
    }

    last.appendLog(log)
  }

  public getLast(): TickLog | null {
    if (this._tickLogs.length > 0)
      return this._tickLogs.slice(-1)[0]
    else
      return null
  }
}