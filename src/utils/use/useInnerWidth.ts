import {Accessor, createSignal, onCleanup, onMount} from "solid-js";

export function useInnerWidth(): Accessor<number> {
  const [innerWidth, setInnerWidth] = createSignal(window.innerWidth)

  const onResize = () => {
    setInnerWidth(window.innerWidth)
  }
  onMount(() => window.addEventListener("resize", onResize))
  onCleanup(() => window.removeEventListener("resize", onResize))

  return innerWidth
}
