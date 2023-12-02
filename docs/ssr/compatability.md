---
scroll: true
---

# Compatability

Library use [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
when initiating `LocomotiveScroll` in `_init` method
[there](https://github.com/somespecialone/potiah/blob/master/lib/src/potiah.ts).

Next means that project can be safely imported in `Node.js` environment and doesn't require additional setup.

```ts
// ...

const scrollCallback = (v: ILenisScrollValues) => {
if (direction != v.direction) {
  potiah.direction = direction = v.direction as 1 | -1
}
}

const { default: LocomotiveScroll } = await import('locomotive-scroll') // [!code focus]

// @ts-expect-error
const loco = markRaw<ILocomotiveScroll>(new LocomotiveScroll({ ...defOptions, ...opt, scrollCallback }))

// wait when Core, Lenis instances are created
await new Promise((resolve) => {
requestAnimationFrame(() => resolve(null))
})

// ...
```
