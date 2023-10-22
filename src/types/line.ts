export interface PieceRate {
  segment: number
  space: number
}

export interface SpacePoint{
  start: number
  end: number
}

export enum CapStyle {
  Flat,
  Square,
  Round,
  Triangle,
}

export enum DashStyle {
  Solid,
  Dash,
  Dot,
  DashDot,
  DashDotDot,
  Custom,
}

export type InnerDashStyle = Exclude<DashStyle, DashStyle.Custom>

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export enum Shape {
  Flat,
  Round,
  Square,
  Triangle
}

