import {CapStyle, DashStyle, Direction, InnerDashStyle, PieceRate, Shape, SpacePoint} from "../types/line.ts";

export function getDashes(dashStyle: InnerDashStyle): number[] {
  switch (dashStyle) {
    case DashStyle.Solid:
      return [1.0, 0.0]
    case DashStyle.Dash:
      return [2.0, 2.0]
    case DashStyle.Dot:
      return [0.0, 2.0]
    case DashStyle.DashDot:
      return [2.0, 2.0, 0.0, 2.0]
    case DashStyle.DashDotDot:
      return [2.0, 2.0, 0.0, 2.0, 0.0, 2.0]
  }
}


export function fixDashes(dashes: number[]): number[] {
  if (dashes.length % 2 == 0) {
    return dashes;
  }

  let new_dashes: number[] = []

  for (let i = 0; i < dashes.length + 1; i++) {
    new_dashes = new_dashes.concat(dashes)
  }

  return new_dashes
}

export function asDashPieces(dashes: number[]): PieceRate[] {
  let pieceRates: PieceRate[] = [];

  for (let i = 0; i < dashes.length; i += 2) {
    pieceRates.push({
      segment: dashes[i],
      space: dashes[i + 1]
    })
  }

  return pieceRates
}

export function calcGroupWidth(pieceRates: PieceRate[], strokeWidth: number): number {
  let sum = 0;

  for (const pieceRate of pieceRates) {
    sum += (pieceRate.segment + pieceRate.space) * strokeWidth
  }

  return sum
}

export function calcSpacePoints(pieceRates: PieceRate[], strokeWidth: number): SpacePoint[] {
  let tempSpacePoint: SpacePoint[] = []

  let current = 0;
  for (const pieceRate of pieceRates) {
    let segmentWidth = pieceRate.segment * strokeWidth;
    let start = current + segmentWidth
    let end = start + pieceRate.space * strokeWidth;
    if (start !== end) {
      tempSpacePoint.push({start, end})
    }
    current = end;
  }

  let spacePoint: SpacePoint[] = []

  for (let i = 0; i < tempSpacePoint.length; i++) {
    if (i != 0 && tempSpacePoint[i].start == tempSpacePoint[i - 1].end) {
      spacePoint[spacePoint.length - 1].end = tempSpacePoint[i].end
    } else {
      spacePoint.push(tempSpacePoint[i])
    }
  }

  return spacePoint
}

export function getCapSize(size: number, direction: Direction): { width: number, height: number } {
  switch (direction) {
    case Direction.Up:
    case Direction.Down:
      return {width: size, height: size / 2}
    case Direction.Left:
    case Direction.Right:
      return {width: size / 2, height: size}
  }
}

export function getPolygonPoints(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      return "50% 0, 100% 100%, 0 100%, 50% 0"
    case Direction.Down:
      return "0 0, 50% 100%, 100% 0, 0 0"
    case Direction.Left:
      return "0 50%, 100% 0, 100% 100%, 0 50%"
    case Direction.Right:
      return "0 0, 100% 50%, 0 100%, 0 0"
  }
}

export function convertToShape(capStyle: CapStyle): Shape {
  switch (capStyle) {
    case CapStyle.Flat:
      return Shape.Flat
    case CapStyle.Square:
      return Shape.Square
    case CapStyle.Round:
      return Shape.Round
    case CapStyle.Triangle:
      return Shape.Triangle
  }
}
