import { TickLog } from './TickLog'

export class ProfileLog {
  readonly label: string
  readonly key: string
  readonly logs: TickLog[]

  constructor(label: string, key: string, public logLimit = 500) {
      this.label = label
      this.key = key
      this.logs = []
  }

  public appendLog(log: TickLog) {
      this.logs.push(log)
      if (this.logs.length > this.logLimit)
          this.logs.shift()
  }
}