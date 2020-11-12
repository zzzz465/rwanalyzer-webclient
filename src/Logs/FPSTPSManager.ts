import Deque from 'double-ended-queue'
import { FPSTPS } from './LogDataReceiver'
// TODO - give a better name, how to say a data that represents datas in a second?

export class FPSTPSManager {
  private _queue = new Deque<FPSTPS>()
  private _queueSize = 10

  get queueSize() { return this._queueSize }
  set queueSize(val: number) {
    this._queueSize = val
    this.omitExcessLog()
  }

  get logs() {
    return this._queue.toArray()
  }

  appendLog (log: FPSTPS): void {
    this._queue.push(log)
    this.omitExcessLog()
  }

  private omitExcessLog() {
    while (this._queue.length > this.queueSize)
      this._queue.dequeue()
  }
}