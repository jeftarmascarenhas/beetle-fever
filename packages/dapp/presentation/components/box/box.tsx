import styled from 'styled-components'
import {
  color,
  layout,
  space,
  flexbox,
  grid,
  position,
  textAlign,
  cursor,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  TextAlignProps,
  CursorProps
} from 'styled-system'

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  BorderProps &
  PositionProps &
  TextAlignProps &
  CursorProps

const Box = styled.div<BoxProps>`
  box-sizing: border-box; // Ensure that padding is included in width. Never remove it.
  min-width: 0; // Ensure the Box can shrink below its minimum content size when used as a flex item. Never remove it.
  ${color}
  ${layout}
  ${space}
  ${flexbox}
  ${grid}
  ${position}
  ${textAlign}
  ${cursor}
`

export default Box
