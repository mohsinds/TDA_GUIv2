import { Typography } from "@mui/material"
import * as React from "react"
import {CustomThemeContext} from "@/themes/CustomThemeContext";

interface TileNotificationProps {
    isVisible: boolean;
    info: any;
    closeNotification: () => void;
  }
  

export default function TileNotification({ isVisible,info,closeNotification }: TileNotificationProps) {
    const [hovered, setHovered] = React.useState(false);
    const themes = React.useContext(CustomThemeContext);

  return (
    <div 
    style={{
        position: "absolute",
        top: 0,
        right: isVisible ? 0 : "-30rem",
        minWidth: "25rem",
        height: "8rem",
        backgroundColor: themes.currentTheme === "dark" ? "#333" : "#e0e0e0",
        color: "#fff",
        transition: "right 0.5s ease",
        padding: "10px 20px 10px 20px",
      }}
    >
        <div style={{width:"100%",height:"20%",display:"flex",justifyContent:"end" }}>
            <div  onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}  onClick={closeNotification} style={{width:"20px",height:"20px",cursor:"pointer",borderRadius:"50%",backgroundColor: hovered ? themes.currentTheme === "dark" ? "#464649" : "#bfbfc1" : "transparent",color:themes.currentTheme === "dark" ? "" : "#232323"}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>  
        </div>
        <div style={{width:"100%",height:"70%",display:"flex",alignItems:"center"}}>
        <div style={{width:"22%",height:"100%",backgroundColor:"#5077B5",borderRadius:"10%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img height="80%" width="80%" src="/static/images/dark.png" />
        </div>
        <div style={{width:"75%",height:"100%",paddingLeft:"15px",paddingRight:'10px'}}>
            <Typography sx={{fontWeight:"500",fontSize:"1.1rem",color:themes.currentTheme === "dark" ? "" : "#232323"}}>Trade Accepted: ID {info?.id}</Typography>
            <Typography sx={{fontWeight:"400",fontSize:"0.9rem",color:themes.currentTheme === "dark" ? "#9F9FA1" : "#353535",whiteSpace:"nowrap"}}>{info?.message}</Typography>
        </div>
        </div>
    </div>
  )
}
