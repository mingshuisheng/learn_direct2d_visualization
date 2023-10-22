import {For, ParentProps} from "solid-js";
import {Box, Select, MenuItem} from "@suid/material";
import * as CSS from "csstype"

interface StructureProps extends ParentProps {
  name: string
}

export function Structure(props: StructureProps) {

  return (
    <Box fontSize="30px">
      <Box>{`${props.name} {`}</Box>
      <Box displayRaw={"flex"} flexDirection={"column"} fontSize={"25px"} ml={"10px"} gap={"10px"} my={"10px"}>
        {props.children}
      </Box>
      <Box>{"}"}</Box>
    </Box>
  )
}

interface StructureFieldProps extends ParentProps {
  name: string
}

export function StructureField(props: StructureFieldProps) {
  return (
    <Box displayRaw={"flex"} alignItems={"center"}>
      <Box color={"#845EC2"}>{props.name}:</Box>
      <Box marginLeft={"10px"} color={"#FF9671"}>{props.children}</Box>
    </Box>
  )
}

interface EnumFieldProps {
  name: string,
  value: any,
  items: { value: any, name: string }[]
  width?: CSS.Property.Width
  onChange?(value: any): void
}

export function EnumField(props: EnumFieldProps) {
  return (
    <StructureField name={props.name}>
      <Select onChange={e => props.onChange && props.onChange(e.target.value)} value={props.value}
              sx={{width: props.width || "400px"}}>
        <For each={props.items}>
          {
            item => (
              <MenuItem value={item.value}>{item.name}</MenuItem>
            )
          }
        </For>
      </Select>
    </StructureField>
  )
}
