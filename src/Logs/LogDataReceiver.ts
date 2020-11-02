import { TickLog } from './TickLog'

export type JsonData = 
  | LogData
  | InitEntries
  | EntryAdded
  | EntrySwapped

export interface LogData {
  type: Events.LogData
  tickLogs: (TickLog & { label: string; key: string })[]
  globalTick: number
}

export interface InitEntries {
  type: Events.InitEntries,
  entries: {
    name: string
    category: string
  }[]
}

export interface EntryAdded {
  type: Events.EntryAdded
  name: string
  category: string
}

export interface EntrySwapped {
  type: Events.EntrySwapped
  entryName: string
}

export const enum Events {
  LogData = 'LogData',
  InitEntries = 'InitEntries',
  EntryAdded = 'EntryAdded',
  EntrySwapped = 'EntrySwapped',
}

interface eventHandler<T> {
  (arg: T): unknown
}

export interface iLogDataReceiver {
  onDataReceive?: eventHandler<JsonData>
}

export class WebSocketLogDataReceiver implements iLogDataReceiver {
  private webSocket: WebSocket
  onDataReceive?: eventHandler<JsonData>
  constructor() {
    this.webSocket = new WebSocket('ws://localhost:4000/rw_analyzer')
    this.webSocket.onmessage = (d) => this.onDataReceive?.(d.data as JsonData)
  }
}

export class MockLogDataReceiver implements iLogDataReceiver {
  onDataReceive?: eventHandler<JsonData>
  private _id?: number
  constructor(public readonly interval: number) {

  }

  /** start generating mock datas */
  Start() {
    if (this._id) return
    const jsonData: LogData = {
      type: Events.LogData,
      globalTick: 0,
      tickLogs: []
    }

    function RandomInt () {
      return Math.floor(Math.random() * 100)
    }

    const generateRandomTickLog = (key: string, label: string) => ({
      hit: RandomInt(),
      key,
      label,
      time: Math.random() * 10,
      tick: jsonData.globalTick
    })

    const mockDatas = [['key1', 'name1'], ['key2', 'name2'], ['key3', 'name3']]

    this._id = setInterval(() => {
      jsonData.globalTick++
      jsonData.tickLogs = []
      for (const [key, name] of mockDatas)
        jsonData.tickLogs.push(generateRandomTickLog(key, name))

      this.onDataReceive?.(jsonData)
    }, this.interval)
  }

  /** stop generating mock datas */
  Stop() {
    if (this._id)
      clearInterval(this._id)
  }

  /** reset state
   * @deprecated not implemented yet
   */
  Reset() {

  }
}