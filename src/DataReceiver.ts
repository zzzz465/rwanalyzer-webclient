export const enum Events {
    Data, // data = TickLog[]
    Control,
}

interface jsonData {
    type: string
    data: any
    globalTick: number
}

export interface control {
    
}

/** contains data in 1 tick */
export interface TickLog {
    /** 몇번 호출되었는지 */
    hit: number
    /** 총 시간이 얼마나 걸렸는지 */
    time: number
    /** 현재 몇 틱에서 발생한건지 */
    tick: number
}

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

export class DataReceiver {
    private socket: WebSocket
    public eventHandler?: (data: jsonData) => void
    public readonly logs: Map<string, ProfileLog>
    private _currentTick: number
    get currentTick(): number {
        return this._currentTick
    }
    public logLimit: number // how many logs we should store?
    constructor() {
        this.logs = new Map()

        this.socket = new WebSocket('ws://localhost:4000/rw_analyzer')
        this.socket.onopen = (ev) => {
            console.log('socket connected to local server')
        }

        this.socket.onmessage = (ev) => this.messageHandler(ev)
        this.logLimit = 500
        this._currentTick = 0
    }

    private messageHandler(ev: MessageEvent) {
        const parsed = JSON.parse(JSON.parse(ev.data)) as jsonData

        switch (parsed.type) {
            case 'reset': {
                this.logs.clear()
            } break

            case 'data': { // TODO - fix interface structure
                const data = parsed.data as TickLog[]
                data.map(d => this.handleData(d as any, parsed.globalTick))
            } break
        }

        this.eventHandler?.call(null, parsed)
    }

    private handleData(log: TickLog & { label: string; key: string }, curTick: number): void {
        this._currentTick = curTick

        const { hit, key, label, time } = log
        if (this.logs.has(key)) {
            const profileLog = this.logs.get(key)!
            profileLog.logs.push({
                hit, time, tick: curTick
            })
            
            if (profileLog.logs.length > this.logLimit)
                profileLog.logs.shift()
        } else {
            const profileLog = new ProfileLog(label, key)

            this.logs.set(key, profileLog)
        }

        for (const [key, value] of this.logs.entries()) {
            const [last] = value.logs.slice(-1)
            if (this.currentTick - last.tick > this.logLimit)
                this.logs.delete(key)
        }
    }
}