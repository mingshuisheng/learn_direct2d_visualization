import {LineSurface} from "../components/Line.tsx";
import {CapStyle, DashStyle} from "../types/line.ts";
import {EnumField, Structure, StructureField} from "../components/Structure.tsx";
import {Box} from "@suid/material";
import {createSignal, Show} from "solid-js";
import {getDashes} from "../utils/line.ts";

const capStyleEnum = [
  {value: CapStyle.Flat, name: "D2D1_CAP_STYLE_FLAT"},
  {value: CapStyle.Square, name: "D2D1_CAP_STYLE_SQUARE"},
  {value: CapStyle.Round, name: "D2D1_CAP_STYLE_ROUND"},
  {value: CapStyle.Triangle, name: "D2D1_CAP_STYLE_TRIANGLE"},
]

const dashStyleEnum = [
  {value: DashStyle.Solid, name: "D2D1_DASH_STYLE_SOLID"},
  {value: DashStyle.Dash, name: "D2D1_DASH_STYLE_DASH"},
  {value: DashStyle.Dot, name: "D2D1_DASH_STYLE_DOT"},
  {value: DashStyle.DashDot, name: "D2D1_DASH_STYLE_DASH_DOT"},
  {value: DashStyle.DashDotDot, name: "D2D1_DASH_STYLE_DASH_DOT_DOT"},
  {value: DashStyle.Custom, name: "D2D1_DASH_STYLE_CUSTOM"},
]

export function DrawLine() {
  const [startCap, setStartCap] = createSignal(CapStyle.Flat)
  const [endCap, setEndCap] = createSignal(CapStyle.Flat)
  const [dashCap, setDashCap] = createSignal(CapStyle.Flat)
  const [dashStyle, setDashStyle] = createSignal(DashStyle.Solid)
  const [dashOffset, setDashOffset] = createSignal(0)
  const [dashes, setDashes] = createSignal([1.0, 0.0])

  return (
    <Box displayRaw={"flex"} flexDirection={"column"}>
      <Box ml={"10px"}>
        <Structure name="D2D1_STROKE_STYLE_PROPERTIES">
          <EnumField name="startCap" value={startCap()} items={capStyleEnum} onChange={value => setStartCap(value)}
                     width={"300px"}/>
          <EnumField name="endCap" value={endCap()} items={capStyleEnum} onChange={value => setEndCap(value)}
                     width={"300px"}/>
          <EnumField name="dashCap" value={dashCap()} items={capStyleEnum} onChange={value => setDashCap(value)}
                     width={"300px"}/>
          <EnumField name="dashStyle" value={dashStyle()} items={dashStyleEnum} onChange={value => {
            setDashes(dashStyle() === DashStyle.Custom ? [1.0, 0.0] : getDashes(dashStyle() as any))
            setDashStyle(value)
          }}
                     width={"300px"}/>
          <StructureField name="dashOffset">
            <Box sx={{
              [`& .dash-offset-input`]: {
                width: "300px",
                height: "56px",
                border: "solid 1px",
                borderColor: "#C4C4C4",
                borderRadius: "4px",
                fontSize: "20px",
                pl: "14px",
                boxSizing: "border-box",
                "&:hover": {
                  border: "solid 1px",
                  borderColor: "#000",
                },
                "&:active, &:focus, &:focus-visible": {
                  border: "solid 2px",
                  borderColor: "#1976D2",
                }
              }
            }}>
              <input type="number" value={dashOffset()} onChange={e => setDashOffset(parseFloat(e.target.value))}
                     step={0.01} class="dash-offset-input"/>
            </Box>
          </StructureField>
        </Structure>
        <Box displayRaw={"flex"}>
          <Show when={dashStyle() === DashStyle.Custom}>
            <Box displayRaw={"flex"} alignItems={"center"}>
              <Box color={"#FF6F91"} fontSize={"25px"}>dashes:</Box>
              <Box ml={"10px"} sx={{
                [`& .dash-offset-input`]: {
                  width: "300px",
                  height: "56px",
                  border: "solid 1px",
                  borderColor: "#C4C4C4",
                  borderRadius: "4px",
                  fontSize: "20px",
                  pl: "14px",
                  boxSizing: "border-box",
                  "&:hover": {
                    border: "solid 1px",
                    borderColor: "#000",
                  },
                  "&:active, &:focus, &:focus-visible": {
                    border: "solid 2px",
                    borderColor: "#1976D2",
                  }
                }
              }}><input type={"text"} value={dashes().join(",")}
                        onChange={e => {
                          const value = e.target.value
                          const arr = value.split(",")
                          setDashes(arr.map(parseFloat))
                        }}
                        class="dash-offset-input"/></Box>
            </Box>
          </Show>
        </Box>
      </Box>
      <Box mt={"30px"}>
        <LineSurface
          strokeWidth={50}
          strokeLen={1000}
          dashStyle={dashStyle()}
          dashOffset={dashOffset()}
          dashCap={dashCap()}
          endCap={endCap()}
          startCap={startCap()}
          dashes={dashes()}
        />
      </Box>
    </Box>
  )
}


