import { ProfileLog } from './ProfileLog'
import { TickLog } from './TickLog'
import { Events, LogData } from './LogDataReceiver'
import { Range } from './LogChunk'

export class LogManager {
    private _currentTick: number
    private _logLimit: number // how many logs we should store?
    private _chunkSize: number
    private readonly _plogs: Map<string, ProfileLog>
    get tickRange(): Range {
        return {
            start: this.currentTick - this._logLimit,
            end: this.currentTick
        }
    }
    get chunkRange(): Range {
        return {
            start: Math.trunc((this.currentTick - this._logLimit) / this.chunkSize),
            end: Math.trunc(this.currentTick / this.chunkSize)
        }
    }
    get profileLogs() {
        return [...this._plogs.values()]
    }
    get currentTick(): number {
        return this._currentTick
    }
    get chunkSize() {
        return this._chunkSize
    }

    constructor(logLimit = 10000, chunkSize = 10) {
        this._plogs = new Map()
        this._currentTick = 0
        this._logLimit = logLimit
        this._chunkSize = chunkSize
    }

    /** call when the selection(currentEntry) is changed */
    public clearLogs() {
        this._plogs.clear()
    }

    public processData({ globalTick, tickLogs }: LogData) {
        this._currentTick = globalTick
        for (const log of tickLogs) {
            let pLog = this._plogs.get(log.key)
            if (!pLog) {
                pLog = new ProfileLog(log.label, log.key, this._logLimit, this.chunkSize)
                this._plogs.set(log.key, pLog)
            }
            pLog.appendLog(log)
        }
    }

    getLog (key: string): ProfileLog | undefined {
        return this._plogs.get(key)
    }
}