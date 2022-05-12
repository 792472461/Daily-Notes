function deepMergeArray (a: any[], b: any[]) {
  return [...a, ...b]
}

function deepMergeObject (a: Record<string, any>, b: Record<string, any>) {
  const rest: Record<string, any> = {}
  Object.keys(b).forEach(key => {
    if (key in a) {
      rest[key] = deepMerge(a[key], b[key])
    } else {
      rest[key] = b
    }
  })
}

function deepMerge (a: any, b: any) {
  if (!a || !b) return a || b
  if (typeof a !== typeof b) return b
  if (Array.isArray(a) && Array.isArray(b)) return deepMergeArray(a, b)

  if (typeof a === 'function') return b
  if (typeof a === 'object') return deepMergeObject(a, b)
  return b
}
