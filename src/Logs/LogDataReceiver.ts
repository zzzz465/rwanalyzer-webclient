import { TickLog } from './TickLog'

export type JsonData = 
  | LogData
  | InitEntries
  | EntryAdded
  | EntrySwapped
  | ToggleGameState

export interface LogData {
  type: Events.LogData
  tickLogs: (TickLog & { label: string; key: string })[]
  globalTick: number
}

export interface ToggleGameState {
  type: Events.toggleTickState
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
  toggleTickState = 'ToggleGameState'
}

interface eventHandler<T> {
  (arg: T): unknown
}

export interface iLogDataReceiver {
  onDataReceive?: eventHandler<JsonData>
  sendMessage: (data: JsonData) => void
}

export class WebSocketClient implements iLogDataReceiver {
  private webSocket: WebSocket
  onDataReceive?: eventHandler<JsonData>
  constructor() {
    this.webSocket = new WebSocket('ws://localhost:4000/rw_analyzer')
    this.webSocket.onmessage = (d) => { 
      const data = JSON.parse(d.data)
      this.onDataReceive?.(data)
    }
  }

  sendMessage(data: JsonData) {
    this.webSocket.send(JSON.stringify(data))
  }
}

export class MockLogDataReceiver implements iLogDataReceiver {
  onDataReceive?: eventHandler<JsonData>
  private _id?: number
  private paused: boolean
  constructor(public readonly interval: number) {
    this.paused = false
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

    const generateRandomTickLog = (key: string, label: string, factor: number) => ({
      hit: RandomInt() * factor,
      key,
      label,
      time: Math.random() * factor,
      tick: jsonData.globalTick
    })

    const mockDatas = [{
      key: 'asdf1',
      label: 'asdf1-label',
      factor: 1
    }, {
      key: 'asdf2',
      label: 'asdf2-label',
      factor: 1
    }, {
      key: 'asdf3',
      label: 'asdf3-label',
      factor: 1
    }]
    // const mockDatas = [['key1', 'name1']]

    this._id = setInterval(() => {
      if (this.paused) return

      jsonData.globalTick++
      jsonData.tickLogs = []
      for (const { factor, key, label } of mockDatas)
        jsonData.tickLogs.push(generateRandomTickLog(key, name, factor))

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

  sendMessage(data: JsonData) {
    switch (data.type) {
      case Events.toggleTickState:
        this.paused = !this.paused
        break
    }
  }
}