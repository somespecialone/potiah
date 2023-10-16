/**
 * ChatGPT :)
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
