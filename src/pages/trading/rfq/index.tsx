import React,{ useState,useEffect } from "react";
import PageTitle from "@/components/TextDisplay/PageTitle";
import SubTitle from "@/components/TextDisplay/SubTitle";
import Tile from "@/components/RFQ Tile/Tile";   
import CurrencyDropdown from '@/components/currencyDropdown/CurrencyDropdown'
import RFQTable from "@/components/Tables/rfqTable";
import { Box, CardMedia, IconButton, SvgIcon, Paper, Avatar, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [tradeSide,setTradeSide] = React.useState<string>("Buy");
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
  const [rows, setRows] = React.useState<RowDataVal[]>([]);
  const [obj, setObj] = React.useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = obj;


  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      console.log("notification supported")
      Notification.requestPermission();
    }
  }, []);

 

  const showNotification = (notificationOptions: any)=>{
    // Check if the Notification API is supported
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }
  
    // Check if the user has granted permission for notifications
    if (Notification.permission === 'granted') {
      // If permission has been granted, show the notification
      const options: NotificationOptions = {
        body: `${notificationOptions?.side} ${notificationOptions?.symbol1} ${notificationOptions?.qty} vs ${notificationOptions?.symbol2} @ ${notificationOptions?.price}`,
        icon: 'https://tda-gui-v2.vercel.app/static/images/dark.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
        dir: 'ltr',
      };
  
      const notification = new Notification(`Trade Accepted: ID ${notificationOptions?.id}`, options);
    } else if (Notification.permission !== 'denied') {
      // If permission hasn't been denied yet, request permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // If permission has been granted, show the notification
          const options: NotificationOptions = {
            body: `${notificationOptions?.side} ${notificationOptions?.symbol1} ${notificationOptions?.qty} vs ${notificationOptions?.symbol2} @ ${notificationOptions?.price}`,
            icon: 'https://tda-gui-v2.vercel.app/static/images/dark.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
            dir: 'ltr',
          };
  
          const notification = new Notification(`Trade Accepted: ID ${notificationOptions?.id}`, options);
        } else {
          console.log('User has denied permission for notifications.');
        }
      });
    } else {
      console.log('User has denied permission for notifications.');
    }
  }


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
      let obj = {
        id: newRow?.id,
        symbol1: symbol1,
        symbol2: symbol2,
        side: newRow?.side,
        qty: formattedFillQty,
        price:newRow.filledPrice
      }

      setTradeSide(val?.side || "")
      
      let x = parseFloat(newRow.filledPrice) * parseFloat(newRow.filledQty);
      let formatted =  x.toLocaleString("en-US")
      if(newRow?.side == "Buy"){
        setSnackbarMessage(`You have Bought ${formattedFillQty} ${symbol1} and Sold ${formatted} ${symbol2} (Notional Value) at a Rate of ${newRow.filledPrice}`);
      }else{
        setSnackbarMessage(`You have Sold ${formattedFillQty} ${symbol1} and Bought ${formatted} ${symbol2} (Notional Value) at a Rate of ${newRow.filledPrice}`);
      }

      setOpen(true);
      showNotification(obj)
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  return (
    <>
      <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
         <SnackbarContent style={{
          backgroundColor: tradeSide == 'Buy' ? '#E2F0D9' : '#FFDDDD',
          color:'#000000',
          fontWeight:500
          }}
          message={<span id="client-snackbar">{snackbarMessage}</span>}
        />
      </Snackbar>
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

    </>
  );
}