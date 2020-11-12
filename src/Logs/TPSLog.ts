import Deque from 'double-ended-queue';
import { LogChunk, Range } from './LogChunk';
import { LogData } from './LogDataReceiver';
import { TickLog } from './TickLog';

interface TpsLogChunk {
  tickRange: Range // domain of this log
  tpsLogs: ReadonlyArray<TpsLog>
  timeSum: number // sum of totalTime in tpsLog
  timeSumOfWatchedLogs: number // sum of totalTimeOfWatchedLogs in tpsLog
  percentage: number // timeSumOfWatchedLogs / timeSum
}

export interface TpsLog {
  tick: number
  totalTime: number // 이 틱을 지나는데 걸리는 시간
  // tickLogs: TickLog[] // 이걸 저장할까? 말까?
  totalTimeOfWatchedLogs: number // 이 틱을 지나는데 
}

export class TPSLogChunk implements TpsLogChunk {
  private _timeSum: number
  private _timeSumOfWatchedLogs: number
  private _percentage: number
  private readonly _tpsLogs: TpsLog[]

  get tpsLogs(): ReadonlyArray<TpsLog> {
    return this._tpsLogs
  }
  get timeSum() {
    return this._timeSum
  }
  get timeSumOfWatchedLogs() {
    return this._timeSumOfWatchedLogs
  }
  get percentage() {
    return this._percentage
  }
  constructor (public readonly tickRange: Range, public readonly chunkSize: number) {
    this._timeSum = 0
    this._percentage = 0
    this._timeSumOfWatchedLogs = 0
    this._tpsLogs = []
  }

  appendLog(log: TpsLog) {
    this._tpsLogs.push(log)

    this._timeSum += log.totalTime
    this._timeSumOfWatchedLogs += log.totalTimeOfWatchedLogs
    this._percentage = this.timeSumOfWatchedLogs / this.timeSum
  }

  get isFull () {
    return this._tpsLogs.length === this.chunkSize
  }
}

export class TPSLogManager {
  private _logChunks: Deque<TPSLogChunk>
  private readonly queueSize: number
  private _currentTick: number

  public get logChunks() {
    return this._logChunks.toArray()
  }

  get currentTick() {
    return this._currentTick
  }

  constructor (public readonly logLimit: number, public readonly chunkSize: number) {
    this._logChunks = new Deque()
    this.queueSize = Math.trunc(logLimit / chunkSize)
    this._currentTick = 0
  }

  processData({ globalTick, tickLogs, totalTime }: LogData) {
    this._currentTick = globalTick
    const totalTimeOfWatchedLogs = tickLogs.reduce((prev, val) => (prev + val.time), 0)

    let last = this._logChunks.peekBack()
    if (!last || last.isFull) {
      const range: Range = {
        start: globalTick - globalTick % this.chunkSize,
        end: globalTick - globalTick % this.chunkSize + this.chunkSize
      }
      last = new TPSLogChunk(range, this.chunkSize)
      this._logChunks.push(last)
      if (this._logChunks.length >= this.queueSize)
        this._logChunks.dequeue() // remove old one
    }

    last.appendLog({ tick: globalTick, totalTime, totalTimeOfWatchedLogs })
  }

  clearLogs (): void {
    this._logChunks.clear()
  }
}