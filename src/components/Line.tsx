import * as CSS from "csstype";
import {CapStyle, DashStyle, Direction, InnerDashStyle, PieceRate} from "../types/line.ts";
import {createMemo, For, Show} from "solid-js";
import {
  asDashPieces,
  calcGroupWidth,
  calcSpacePoints,
  convertToShape,
  fixDashes,
  getDashes
} from "../utils/line.ts";
import {useInnerWidth} from "../utils/use";
import {Cap} from "./LineCap.tsx"
import {Box} from "@suid/material";

interface LineProps {
  color: CSS.Property.BackgroundColor
  dashCap: CapStyle
  strokeWidth: number
  pieceRates: PieceRate[]
  timesGroup: number
  dashOffset: number
}

export function Line(props: LineProps) {
  return (
    <Box zIndex={10} position={"absolute"} height={"fit-content"} width={"fit-content"} displayRaw={"flex"}
         sx={{transform: `translate3d(${props.dashOffset}px, 0, 0)`}}>
      <For each={new Array(props.timesGroup)}>
        {
          () => (
            <Group dashCap={props.dashCap} color={props.color} strokeWidth={props.strokeWidth}
                   pieceRates={props.pieceRates}/>
          )
        }
      </For>
    </Box>
  )
}

interface VisibleAreProps {
  height: number
  maskLen: number
}

export function VisibleArea(props: VisibleAreProps) {
  return (
    <Box zIndex={11} position={"absolute"} width={"100%"} displayRaw={"flex"} justifyContent={"space-between"}
         height={`${props.height}px`} sx={{opacity: "0.8"}}>
      <Box bgcolor={"white"} height={"100%"} width={`${props.maskLen}px`}/>
      <Box bgcolor={"white"} height={"100%"} width={`${props.maskLen}px`}/>
    </Box>
  )
}

interface GroupProps {
  color: CSS.Property.BackgroundColor
  strokeWidth: number
  dashCap: CapStyle
  pieceRates: PieceRate[]
}

function Group(props: GroupProps) {
  return (
    <Box displayRaw={"flex"}>
      <For each={props.pieceRates}>
        {
          (pieceRate) => (
            <Piece dashCap={props.dashCap} color={props.color} pieceRate={pieceRate} strokeWidth={props.strokeWidth}/>
          )
        }
      </For>
    </Box>
  )
}

interface PieceProps {
  color: CSS.Property.BackgroundColor
  strokeWidth: number
  dashCap: CapStyle
  pieceRate: PieceRate
}

function Piece(props: PieceProps) {
  const segmentWidth = () => props.strokeWidth * props.pieceRate.segment;
  const spaceWidth = () => props.strokeWidth * props.pieceRate.space;

  return (
    <Box displayRaw={"flex"} position={"relative"}>
      <Cap position={"absolute"} top={0} size={props.strokeWidth} direction={Direction.Left}
           shape={convertToShape(props.dashCap)}
           bgcolor={"red"} left={`-${props.strokeWidth / 2}px`}/>
      <Box bgcolor={props.color} width={`${segmentWidth()}px`} height={`${props.strokeWidth}px`}
           sx={{backgroundClip: "content-box"}}/>
      <Cap position={"absolute"} top={0} size={props.strokeWidth} direction={Direction.Right}
           shape={convertToShape(props.dashCap)}
           bgcolor={"red"} right={`${spaceWidth() - props.strokeWidth / 2}px`}/>
      <Box bgcolor={"transparent"} width={`${spaceWidth()}px`} height={`${props.strokeWidth}px`}/>
    </Box>
  )
}

type LineSurfaceProps = {
  strokeWidth: number
  strokeLen: number
  startCap: CapStyle
  endCap: CapStyle
  dashCap: CapStyle
  dashOffset: number
} & (
  { dashStyle: InnerDashStyle }
  | { dashStyle: DashStyle.Custom, dashes: number[] }
  )

export function LineSurface(props: LineSurfaceProps) {

  const dashes = (): number[] => {
    if (props.dashStyle === DashStyle.Custom) {
      return props.dashes.length > 0? props.dashes: [1.0, 0.0]
    } else {
      return getDashes(props.dashStyle)
    }
  }
  const innerWidth = useInnerWidth();
  const pieceRates = () =>
    props.dashStyle === DashStyle.Solid ? [{
      segment: innerWidth() / props.strokeWidth,
      space: 0.0
    }] : asDashPieces(fixDashes(dashes()))
  const groupWidth = createMemo(() => calcGroupWidth(pieceRates(), props.strokeWidth))
  const spacePoints = () => calcSpacePoints(pieceRates(), props.strokeWidth)

  const halfTimesGroup = () => props.dashStyle === DashStyle.Solid ? 1 : Math.ceil(innerWidth() / groupWidth())
  const timesGroup = () => props.dashStyle === DashStyle.Solid ? 2 : halfTimesGroup() <= 2 ? 3 : halfTimesGroup() * 2
  const maskLen = () => (innerWidth() - props.strokeLen) / 2
  const userOffset = () => (props.dashOffset * props.strokeWidth) % groupWidth()
  const dashOffset = () => props.dashStyle === DashStyle.Solid ? 0 : maskLen() - halfTimesGroup() * groupWidth() + userOffset()
  const showStartCap = () => {
    let offset = userOffset()
    let totalWidth = groupWidth()
    if (offset > 0) {
      offset = totalWidth - offset
    } else {
      offset = -offset
    }
    let points = spacePoints()
    return !points.some(point => offset > point.start && offset < point.end)
  }

  const showEndCap = () => {
    let totalWidth = groupWidth()
    let offset = (props.strokeLen - userOffset()) % totalWidth
    let points = spacePoints()
    return !points.some(point => offset > point.start && offset < point.end)
  }

  return (
    <Box position={"relative"} height={"50px"} sx={{overflowX: "hidden"}} boxSizing={"content-box"} py={"10px"}>
      <Box zIndex={12} width={"1px"} bgcolor={"green"} position={"absolute"} top={0} left={`${maskLen()}px`}
           height={`${props.strokeWidth + 20}px`}/>
      <VisibleArea height={props.strokeWidth} maskLen={maskLen()}/>
      <Box zIndex={12} width={"1px"} bgcolor={"green"} position={"absolute"} top={0} right={`${maskLen()}px`}
           height={`${props.strokeWidth + 20}px`}/>
      <Show when={showStartCap()}>
        <Cap zIndex={13} position={"absolute"} top={"10px"} size={props.strokeWidth} direction={Direction.Left}
             shape={convertToShape(props.startCap)}
             bgcolor={"blue"} left={`${maskLen()}px`} sx={{transform: `translateX(-100%)`}}/>
      </Show>
      <Line dashCap={props.dashCap} color="black" strokeWidth={props.strokeWidth} pieceRates={pieceRates()}
            timesGroup={timesGroup()}
            dashOffset={dashOffset()}/>
      <Show when={showEndCap()}>
        <Cap zIndex={13} position={"absolute"} top={"10px"} size={props.strokeWidth} direction={Direction.Right}
             shape={convertToShape(props.endCap)}
             bgcolor={"blue"} right={`${maskLen()}px`} sx={{transform: "translateX(100%)"}}/>
      </Show>
    </Box>
  )
}
