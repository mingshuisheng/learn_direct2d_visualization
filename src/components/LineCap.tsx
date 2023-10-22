import {Direction, Shape} from "../types/line.ts";
import {Show, splitProps} from "solid-js";
import {getCapSize, getPolygonPoints} from "../utils/line.ts";
import {Box} from "@suid/material";
import {SysDivProps, SxProps} from "../types";

interface CapProps {
  size: number,
  direction: Direction,
  shape: Shape,
}

const roundClasses: Record<string, SxProps> = {
  [`${Direction.Up}`]: {
    borderTopLeftRadius: "9999px",
    borderTopRightRadius: "9999px",
  },
  [`${Direction.Down}`]: {
    borderBottomLeftRadius: "9999px",
    borderBottomRightRadius: "9999px",
  },
  [`${Direction.Left}`]: {
    borderTopLeftRadius: "9999px",
    borderBottomLeftRadius: "9999px",
  },
  [`${Direction.Right}`]: {
    borderTopRightRadius: "9999px",
    borderBottomRightRadius: "9999px",
  },
}

export function Cap(props: CapProps & SysDivProps) {

  const [local, others] = splitProps(props, ["size", "direction", "shape", "sx"])

  const size = () => getCapSize(local.size, local.direction)

  const sx = () => {
    let {width, height} = size();
    let sx: SxProps = {
      width: `${width}px`,
      height: `${height}px`,
    }

    //处理三角形
    if (local.shape === Shape.Triangle) {
      sx.WebkitClipPath = `polygon(${getPolygonPoints(local.direction)})`
    }

    //处理半圆
    if (local.shape === Shape.Round){
      sx = {...sx, ...roundClasses[local.direction]}
    }

    return {...sx, ...local.sx} as SxProps
  }

  return (
    <Show when={local.shape !== Shape.Flat}>
      <Box sx={sx()} {...others} />
    </Show>
  )
}
