import PageTitle from "@/components/TextDisplay/PageTitle";
import SubTitle from "@/components/TextDisplay/SubTitle";
import Tile from "@/components/RFQ Tile/Tile";   
import { Box, CardMedia, IconButton, SvgIcon, Paper, Avatar } from "@mui/material";
// import Image from 'mui-image'
// import Hlogo from "../../../Images/Logo_dark.jpg"
// import HLOGO from "@/Images/dark.png"
import HLOGO from "../../../../src/Images/dark.png"
// import Image from 'material-ui-image'

// import { ReactComponent as MySvg } from "../../../Images/ec_logo.svg"; 
export default function SpotRFQPage() {
  // const imagin = () => {
  //   // return <Image src="../../../Images/dark.png"/>
  // }
  return (
    <>
      <PageTitle
        sx={{
          textWrap: "nowrap",
          minWidth: "300px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Request for Quote Portal
      </PageTitle>
      <SubTitle
        sx={{
          textWrap: "nowrap",
          minWidth: "300px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Click Initiate RFQ to intantly receive a quote
      </SubTitle>
      <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:3,
      }}
      >
      <Tile />
      </Box>
      <Box>
      {/* <Image src="https://app.condorcash.com/Logo.png"/> */}
      </Box>
      <div>
        {/* <img src="../../../Images/ug.jpeg"/> */}
      </div>
        <Avatar alt="" src="vercel.svg" />

    </>
  );
}
// Click Initiate RFQ to intantly receive a quote 