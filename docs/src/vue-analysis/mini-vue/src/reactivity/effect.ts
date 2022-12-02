class ReactiveEffect {
  private fn
  constructor(fn: () => void) {
    this.fn = fn
  }
  run() {
    activeEffect = this
    this.fn()
  }
}

const targetMap: Map<object, Map<string, Set<ReactiveEffect>>> = new Map()
export function track(target: object, key: string) {
  // target -> key -> dep
  let depsMap: Map<string, Set<ReactiveEffect>> | undefined = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep: Set<ReactiveEffect> | undefined = depsMap.get(key)
  if (!dep) dep = new Set()
  dep.add(activeEffect)
}

export function trigger(target: object, key: string) {
  let depsMap = targetMap.get(target)

  let dep = depsMap!.get(key)
  if (dep) {
    for (const effect of dep) {
      effect.run()
    }
  }

}

let activeEffect: ReactiveEffect

export function effect(fn: () => void) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}