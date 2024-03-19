import React,{ useState,useEffect } from "react";
import PageTitle from "@/components/TextDisplay/PageTitle";
import SubTitle from "@/components/TextDisplay/SubTitle";
import TileNotification from "@/components/Notifications/TileNotification";
import Tile from "@/components/RFQ Tile/Tile";   
import CurrencyDropdown from '@/components/currencyDropdown/CurrencyDropdown'
import RFQTable from "@/components/Tables/rfqTable";
import { Box, CardMedia, IconButton, SvgIcon, Paper, Avatar, Typography } from "@mui/material";
import HLOGO from "../../../../src/Images/dark.png"

interface RowDataVal {
  id:string;
  transactTime: string;
  symbol: string;
  side: string;
  filledQty: string;
  filledPrice: string;
  accountNum : string;
  status: string;
}

export default function SpotRFQPage() {
  const [symbol1, setSymbol1] = useState<string>('USDT');
  const [symbol2, setSymbol2] = useState<string>('USD');
  const [isVisible,setIsVisible] = useState<boolean>(false);
  const [notificationData,setNotificationData] = useState<any>({});
  const [rows, setRows] = React.useState<RowDataVal[]>([]);

    // Function to update symbol1
    const handleSymbolOne = (newSymbol: string) => {
      console.log("symbol1",newSymbol)
      setSymbol1(newSymbol);
    };

    const handleCloseNotification = () => {
      setIsVisible(false);
    };

    // Function to update symbol2
    const handleSymbolTwo = (newSymbol: string) => {
      console.log("symbol2", newSymbol);
      setSymbol2(newSymbol);
    };
    function generateRandomId() {
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate random number between 1000 and 9999
      return randomNumber.toString(); // Convert the random number to string
    }

    const handleAddRow = (val: Partial<RowDataVal>) => {
    const newId = generateRandomId();
    let fillQtyVal = parseFloat(val?.filledQty || "0");
    let formattedFillQty = fillQtyVal?.toLocaleString("en-US");
    const newRow: RowDataVal = {
      id: newId,
      transactTime: val.transactTime || "", 
      symbol: val.symbol || "",
      side: val.side || "",
      filledQty: val.filledQty || "",
      filledPrice: val.filledPrice || "",
      accountNum: val.accountNum || "",
      status: val.status || ""
    };
    setRows([newRow, ...rows]);
    setIsVisible(true);
    setNotificationData({
      id: newId,
      message:`${val?.side} ${symbol1} ${formattedFillQty} vs ${symbol2} @ ${val?.filledPrice}`
    })
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    }

  return (
    <div style={{position:'relative' }}>

      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <TileNotification isVisible={isVisible} info={notificationData} closeNotification={handleCloseNotification}/>
      </div>
      
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
        Click Initiate RFQ to instantly receive a quote
      </SubTitle>

      <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      }}
      >
        <CurrencyDropdown handleSymbolOne={handleSymbolOne} handleSymbolTwo={handleSymbolTwo} />

      </Box>
        
      <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // marginTop:15,
      }}
      >
      <Tile symbol1={symbol1} symbol2={symbol2} handleSymbolTwo= {handleSymbolTwo} handleAddRow={handleAddRow} />
      </Box>

      <Box
        sx={{
          marginTop: 5,
        }}
      >
        <RFQTable rows={rows} />
      </Box>

    </div>
  );
}