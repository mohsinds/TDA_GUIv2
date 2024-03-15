import React,{ useState } from "react";
import PageTitle from "@/components/TextDisplay/PageTitle";
import SubTitle from "@/components/TextDisplay/SubTitle";
import Tile from "@/components/RFQ Tile/Tile";   
import CurrencyDropdown from '@/components/currencyDropdown/CurrencyDropdown'
import RFQTable from "@/components/Tables/rfqTable";
import { Box, CardMedia, IconButton, SvgIcon, Paper, Avatar, Typography } from "@mui/material";
import HLOGO from "../../../../src/Images/dark.png"

interface RowDataVal {
  id:string;
  transactTime: string;
  sideSymbol: string;
  filledQty: string;
  filledPrice: string;
  accountNum : string;
  status: string;
}

export default function SpotRFQPage() {
  const [symbol1, setSymbol1] = useState<string>('USDT');
  const [symbol2, setSymbol2] = useState<string>('USD');
  const [rows, setRows] = React.useState<RowDataVal[]>([]);

    // Function to update symbol1
    const handleSymbolOne = (newSymbol: string) => {
      console.log("symbol1",newSymbol)
      setSymbol1(newSymbol);
    };
  
    // Function to update symbol2
    const handleSymbolTwo = (newSymbol: string) => {
      console.log("symbol2", newSymbol);
      setSymbol2(newSymbol);
    };
    function generateRandomId() {
      const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
      const randomString = Math.random().toString(36).substr(2, 5); // Generate random string
      return timestamp + randomString; // Combine timestamp and random string
    }

    const handleAddRow = (val: Partial<RowDataVal>) => {
    const newId = generateRandomId();
    const newRow: RowDataVal = {
      id: newId,
      transactTime: val.transactTime || "", 
      sideSymbol: val.sideSymbol || "",
      filledQty: val.filledQty || "",
      filledPrice: val.filledPrice || "",
      accountNum: val.accountNum || "",
      status: val.status || ""
    };
      setRows([newRow, ...rows]);
    }

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

    </>
  );
}