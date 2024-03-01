import * as React from "react"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, Avatar } from "@mui/material"
import { StyledAppBar } from "./StyledAppBar"
import ThemeToggle from "./ThemeToggle"
import UserMenu from "./UserMenu"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import { CustomThemeContext } from "@/themes/CustomThemeContext";

interface Props {
  open: boolean
  toggleSide: Function
}

function Header({ open, toggleSide }: Props) {
  const themes = React.useContext(CustomThemeContext);
  return (
    <StyledAppBar
      position="fixed"
      style={{ paddingRight: "0px important!" }}
      sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Toolbar sx={{ paddingLeft: "17px ", width: "100%" }}>
        <IconButton
          aria-label="open drawer"
          onClick={() => toggleSide(!open)}
          edge="start"
          sx={{
            marginRight: 5,
          }}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
          
        </IconButton>
        <Avatar alt="1" src={themes.currentTheme === 'dark' ? "/static/images/dark.png" : "/static/images/Light.png"} sx={{
            width:35,
            height:35,
            marginRight:3
          }} />
        <Box
          display={"flex"}
          alignItems={"center"}
          flex={1}>
          <Typography
            color="textPrimary"
            variant="h6"
            noWrap
            component="div">
            Trillion Digital Assets
          </Typography>
          <Box
            display={"flex"}
            flex={1}
            justifyContent={"flex-end"}
            gap={3}>
            <ThemeToggle />
            <Box sx={{ mr: 1 }}>
              <UserMenu />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
