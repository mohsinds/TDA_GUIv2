import { Typography, TypographyProps } from "@mui/material"
import * as React from "react"

export default function Subtitle({ ...props }: TypographyProps) {
  return (
    <Typography
      variant="string"
      {...props}
    />
  )
}
