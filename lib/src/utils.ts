/**
 * Identical to {@link ObjectConstructor.assign} or `Object.assign` but with array of omitted props.
 *
 * @author ChatGPT
 */
export function assignWithOmit<T extends {}, S extends Record<string, any>, K extends keyof S>(
  target: T,
  source: S,
  omitProps: K[]
): T & Omit<S, K> {
  for (const key in source) {
    if (!omitProps.includes(key as unknown as K) && source[key] != undefined) {
      // @ts-expect-error
      target[key] = source[key]
    }
  }

  // @ts-expect-error
  return target
}

export function boolToDataAttr(v: boolean | undefined): '' | null {
  return v ? '' : null
}

export function* infiniteGenerator() {
  let i = 0

  while (true) {
    yield i++
  }
}

/**
 * Map progress from specified range to another one (0,1 by default).
 *
 * @example
 * ```
 * const mapped = mapRange(progress, 0.5, 0.75)
 * ```
 *
 * @author ChatGPT, somespecialone
 *
 * @param x - progress value. From 0 to 1
 * @param from
 * @param to
 * @param rangeMin
 * @param rangeMax
 * @returns number - remapped progress
 */
export function mapRange(x: number, from: number, to: number, rangeMin = 0, rangeMax = 1): number {
  return Math.max(Math.min(((x - from) * (rangeMax - rangeMin)) / (to - from) + rangeMin, rangeMax), rangeMin)
}
