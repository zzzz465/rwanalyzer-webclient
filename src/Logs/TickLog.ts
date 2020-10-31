/** contains data in 1 tick */
export interface TickLog {
  /** 몇번 호출되었는지 */
  hit: number
  /** 총 시간이 얼마나 걸렸는지 */
  time: number
  /** 현재 몇 틱에서 발생한건지 */
  tick: number
}