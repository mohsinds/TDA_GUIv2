import {  rgb} from "polished"
import { createContext } from 'react'
const darkPrimary = {
  base: rgb(40, 46, 57),
  1: rgb(47, 53, 66),
  2: rgb(61, 68, 85),
  3: rgb(83, 87, 96),
  4: rgb(104, 109, 116),
  5: rgb(126, 129, 136),
  6: rgb(52, 58, 71),
}
export type Color = string
const WHITE: Color = rgb(255, 255, 255)
const darkSecondary = {
  base: WHITE,
  1: rgb(249, 249, 249),
  2: rgb(243, 243, 244),
  3: rgb(228, 229, 230),
  4: rgb(207, 208, 211),
  5: rgb(189, 190, 195),
  6: rgb(161, 165, 174),
}

export const CustomThemeContext = createContext({
  currentTheme: 'dark',
  primary: darkPrimary,
  secondary: darkSecondary,
  core: {
    lightBackground: darkPrimary[1],
    darkBackground: darkPrimary.base,
    alternateBackground: darkPrimary[3],
    offBackground: darkPrimary[3],
    textColor: darkSecondary.base,
    backgroundHoverColor: darkPrimary[2],
    primaryStyleGuideBackground: rgb(32, 36, 45),
    secondaryStyleGuideBackground: rgb(40, 45, 57),
    dividerColor: darkPrimary[6],
    activeColor: rgb(95, 148, 245),
  },
  toggle: () => {},
})
