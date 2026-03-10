import { C } from '../../constants/tokens.js'

export default function HumandLogo({ size = 'md', dark = false }) {
  const heights = { sm: 22, md: 28, lg: 36, xl: 48 }
  const h = heights[size] || 28
  const color = dark ? '#111827' : C.primary

  /* "humand" en SVG con la tipografía redondeada exacta del logo real */
  return (
    <svg height={h} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <text
        y="27"
        fontFamily="Comfortaa, 'DM Sans', sans-serif"
        fontWeight="700"
        fontSize="30"
        fill={color}
        letterSpacing="-0.5"
      >humand</text>
    </svg>
  )
}
