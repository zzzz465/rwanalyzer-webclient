import { ProfileLog } from './ProfileLog'
import { TickLog } from './TickLog'
import { Events, LogData } from './LogDataReceiver'

export class LogManager {
    private _currentTick: number
    public readonly logs: Map<string, ProfileLog>
    get currentTick(): number {
        return this._currentTick
    }
    private _logLimit: number // how many logs we should store?
    get logLimit() {
        return this._logLimit
    }

    set logLimit(val: number) {

    }

    constructor(logLimit = 500) {
        this.logs = new Map()
        this._currentTick = 0
        this._logLimit = logLimit
    }

    /** call when the selection(currentEntry) is changed */
    public clearLogs() {
        this.logs.clear()
    }

    public processData({ globalTick, tickLogs }: LogData) {
        this._currentTick = globalTick
        for (const log of tickLogs)
            this.handleData(log, globalTick)

        for (const [key, profileLog] of this.logs.entries()) {
            const last = profileLog.getLast()
            if (last === null || globalTick - last.tick > this.logLimit)
                this.logs.delete(key)
        }
    }

    private handleData(log: TickLog & { label: string; key: string }, curTick: number): void {
        const { hit, key, label, time } = log
        if (this.logs.has(key)) {
            const profileLog = this.logs.get(key)!
            profileLog.appendLog(log)
        } else {
            const profileLog = new ProfileLog(label, key, 500)
            profileLog.appendLog(log)
            this.logs.set(key, profileLog)
        }

        for (const [key, profileLog] of this.logs.entries()) {
            const last = profileLog.getLast()
            if (!last || this.currentTick - last.tick > this.logLimit)
                this.logs.delete(key)
        }
    }
}