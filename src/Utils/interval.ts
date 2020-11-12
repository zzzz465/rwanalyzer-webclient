// we can just use [setInterval(), setInterval(), ... ] ?
function createIntervalKeys(...keys: number[]): number[] {
  return keys
}

export function clearIntervals(keys: number[]): number[] {
  for (const key of keys)
    clearInterval(key)
  return []
}