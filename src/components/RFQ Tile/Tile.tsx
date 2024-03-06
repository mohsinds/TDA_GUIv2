import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import LinearProgress from "@mui/material/LinearProgress";
import { CustomThemeContext } from "@/themes/CustomThemeContext";
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import axios from "axios";


const [textChange$, setText] = createSignal<string>();
const [useText, text$] = bind(textChange$, "1000")

export default function Tile() {
  const themes = React.useContext(CustomThemeContext);
  const [inputValue, setInputValue] = React.useState<boolean>(false);
  const [InitiateRq, setInitRq] = React.useState<boolean>(false);
  const [onHov, setOnHov] = React.useState<boolean>(false);
  const [hideRQ, setHideRq] = React.useState<boolean>(false);
  const [buyValue, setBuyValue] = React.useState("00000");
  const [sellValue, setSellValue] = React.useState("00000");
  const [iniNum, setInitNumb] = React.useState("1000");
  const [cancelToken, setCancelToken] = React.useState(null);

  const text = useText()
  const [progress, setProgress] = React.useState(100);
  const [buySell, setBuySell] = React.useState(false);
  const [buySellValue, setBuySellValue] = React.useState("");
  const [secondCounter, setSecCounter] = React.useState(100)
  const intervalRef = React.useRef<number | null>(null);

  const formatNumber = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    // Format the number as desired
    const formattedValue = parseInt(numericValue).toLocaleString("en-US");
    // Update the state with the formatted value
    setInitNumb(formattedValue);
    // Return the unformatted numeric value for input display
    return numericValue;
  };

  const inlargedNum = (value: string, valueOf: string) => {
    console.log("value", value, "valueof", valueOf);
    const xxx = value?.split(".")[1];
    const yyy = value?.split(".")[0];
    return (
      <>
        <Typography
          sx={{
            display: "flex",
            fontSize: 11,
            alignItems: "center",
            marginTop: -3,
            // backgroundColor:'green',
            width: 90,
            color: secondCounter > 50 ? "white" : valueOf === "BUY" ? "#26BAFC" : "red",
            "&:hover": { color: "white" }
          }}
        >
          <div style={{ paddingTop:'12px',fontWeight:500 }}>
            {yyy + "." + xxx?.substr(0, 2)}
          </div>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "semibold",
              paddingX:0.2
              // marginBottom: -3,
            }}
          >
          
              {xxx?.substr(2, 2)}
          </Typography>
          <div style={{ paddingTop:'12px',fontWeight:500 }}>
          {xxx?.substr(4, 10)}
          </div>
          
         
        </Typography>
    
      </>
    );
  };

  const handleReject = ()=>{
    setProgress(100);
    setInputValue(false);
    setHideRq(false);
    setSecCounter(0);
    stopProgressBar()
  }



  const progBar = () => {
    const decreaseAmount = 100 / (10); // Decrease amount per second to reach 0 in 10 seconds

    intervalRef.current = window.setInterval(() => {
      setProgress((oldProgress) => {
        // If progress reaches 0, clear the interval
        if (oldProgress === 0) {
          // clearInterval(timer);
          setInitRq(false)
          setHideRq(false)
          setBuySell(false)
          setInputValue(false)
          handleReject()
          return 0;
        }
        // Decrease the progress by the calculated amount
        console.log('counter', Math.max(oldProgress - decreaseAmount, 0))
        setSecCounter(Math.max(oldProgress - decreaseAmount, 0))
        return (Math.max(oldProgress - decreaseAmount, 0))


      });
    }, 500); // Run every second

    // Set the initial progress to 100 when starting the progress bar
    setProgress(100);
  };



  const stopProgressBar = () => {
    clearInterval(intervalRef.current!);
    console.log("Interval cleared");
  };


  const buySellCard = (val: string) => {
    console.log('sellbuyvalue', buySellValue)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 130,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          USDT/USD
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            fontWeight: '600',
          }}
        >
          You {" " + buySellValue + " "}
          <Typography
            sx={{
              backgroundColor: 'white',
              color: buySellValue === "buy" ? "green" : "#F64A69",
              fontSize: 10,
              fontWeight: '600',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              width: 60,
              marginX: 2
            }}
          >
            {" USDT " + iniNum}
          </Typography>
          at a rate of
          <Typography
            sx={{
              backgroundColor: 'white',
              color: buySellValue === "buy" ? "green" : "#F64A69",
              fontSize: 10,
              fontWeight: '600',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              width: 40,
              marginX: 1,
            }}
          >
            {val}
          </Typography>

        </Typography>
        <Button
          sx={{
            color: "white",
            alignSelf: "center",
            backgroundColor: buySellValue === "buy" ? "green" : "#F64A69",
            borderRadius: 50,
            padding: 1,
            fontSize: 10,
          }}
          onClick={() => {
            setBuySell(false);
            setBuySellValue("")
            inlargedNum("1.23457", "SELL");
          }}
        >
          Close
        </Button>
      </div>
    );
  };

  const cancelRequest = () => {
    setInitRq(true);

    // Schedule a function to set initRq back to false after 2000 milliseconds (2 seconds)
    setTimeout(() => {
      setInitRq(false);
      setHideRq(true);
    }, 1000);
  };

   // InitiateRq ? setInitRq(false)
    // :
    // iniNum !== "" && cancelRequest(),
    // iniNum !== "" && setInputValue(true),
    // setBuyValue("0.23476"),
    // setSellValue("1.23745"),
    // progBar()

  const handleInitiateRFQ = async()=>{
      if(text){
        try {
          if (cancelToken) {
            cancelToken.cancel('Request canceled');
          }
  
          // Create a new cancel token
          const source = axios.CancelToken.source();
          setCancelToken(source);

          setInitRq(true);
        const response = await axios.get(`http://192.168.8.102:5000/customer/rfq?symbol=BTC-USD&currency=BTC&orderQty=${text}`,{
          cancelToken: source.token,
        });
        if(response.data?.length > 0){
          let obj = response?.data[0]
          console.log("obj==>",obj)
          setInputValue(true)
          setInitRq(false);
          setHideRq(true);
           setBuyValue(obj?.BidPx ? obj?.BidPx : "00000"),
           setSellValue(obj?.OfferPx ? obj?.OfferPx : "00000"),
          progBar()
        }else{
          alert("request failed")
          setTimeout(() => {
            setInitRq(false);
          }, 2000);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error:', error.message);
        }
      } finally {
        setInitRq(false);
      }
    }else{
      alert("Currency is required")
    }
  }

  const handleCancelRequest = async()=>{
    if (cancelToken) {
      cancelToken.cancel('Request canceled by user');
    }
    setInitRq(false)
  }


  return buySell ? (
    <Card
      sx={{
        display: "flex",
        height: 190,
        width: 350,
        paddingX: 3,
        paddingY: 2,
        flexDirection: "column",
        backgroundColor: buySell
          ? buySellValue === "buy"
            ? "green"
            : "#F5264B"
          : "",
      }}
    >
      <CardContent>{buySellCard(sellValue)}</CardContent>
    </Card>
  ) : (
    <Card
      sx={{
        display: "flex",
        height: 170,
        width: 340,
        paddingX: 3,
        // paddingY: 1,
        justifyContent:'center',
        flexDirection: "column",
        transition: 'background-color 0.1s', // Optional: Add a transition effect for smoother color change
        '&:hover': {
          backgroundColor: themes.currentTheme === "dark" ? '#32323f' : '', 
          boxShadow: onHov ? themes.currentTheme === "dark" ? '' : '0px 0px 10px 0px rgba(0,0,0,0.2)' : 'none',// Change this to the desired hover background color
        },
        
        
      }}
      onMouseEnter={() => setOnHov(true)} // Set onHov to true on mouse enter
      onMouseLeave={() => setOnHov(false)} // Set onHov to false on mouse leave
    >
      <>
        <Typography
          sx={{
            // fontWeight: 'bold'
            fontSize: 13,
            color: themes.currentTheme === "dark" ? "#FFFFFF" : 'black',
            marginBottom: 1
          }}
        >
          USDT/USD
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <CardActionArea
            sx={{
              backgroundColor: hideRQ && secondCounter > 50 ? 'red' : onHov ? themes.currentTheme === "dark" ? '#434354' : '#f9f9f9' : 'transparent',
              width: 110,
              height:55,
              borderRadius: 1,
              paddingX: 2,
              paddingY: 1,
              transition: 'background-color 0.8s',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
              "&:hover": { backgroundColor: hideRQ ? "red" : ''},
            }}
            onClick={() => {
              hideRQ && setBuySellValue("sell");
              hideRQ && setBuySell(true);
            }}
          >
            {InitiateRq ? (
              <Typography
                sx={{
                  marginTop: 1,
                  fontSize: 12,
                  alignSelf: 'center'
                }}
              >Requesting</Typography>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: 9,
                    color:hideRQ && secondCounter > 50 ? 'white' : '#949596',
                    // fontWeight: 'bold',

                  }}
                >
                  SELL
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    // alignSelf: "center",
                    marginTop: 0.5
                  }}
                >
                  {inputValue && inlargedNum(sellValue, "SELL")}
                  
                </Typography>
                {secondCounter < 10 && hideRQ && ( <Typography
                  sx={{
                    fontSize: 8,
                    color:'red',
                    textAlign: 'center',
                    width: 80,
                    marginTop: -1
                  }}
                >
                  Expired  
                </Typography>)}
              </>
            )}
          </CardActionArea>
          {secondCounter < 10 && hideRQ ? (
            <Button
              onClick={() => {
                setInitRq(false)
                setHideRq(false)
                setBuySell(false)
                setInputValue(false)
              }}
              sx={{
                bgcolor: "#5F94F5",
                height: 40,
                width: 40,
                marginX: 0.9,
                color: "#e8e8e8",
                fontSize: 9,
                textTransform: "capitalize",
                placeSelf: "center",
                lineHeight: 1.5,
                // marginTop: 1.5,
                "&:hover": {
                  backgroundColor: "#85aff7",
                  color: "#3c52b2",
                },
              }}
            >
              {"Requote"}
            </Button>
          )
            :
            (
              !hideRQ &&
              InitiateRq ? (
              <Button
                onClick={handleCancelRequest}
                sx={{
                  bgcolor: "#5F94F5",
                  height: 40,
                  width: 40,
                  color: "#e8e8e8",
                  fontSize: 9,
                  marginX: 0.9,
                  textTransform: "capitalize",
                  placeSelf: "center",
                  lineHeight: 1.4,
                  // marginTop: 1.5,
                  "&:hover": {
                    backgroundColor: "#85aff7",
                    color: "#3c52b2",
                  },
                }}
              >
                Cancel RFQ
              </Button>
              ) : (
                <Button
                onClick={handleInitiateRFQ}
                sx={{
                  bgcolor: "#5F94F5",
                  height: 40,
                  width: 40,
                  color: "#e8e8e8",
                  fontSize: 9,
                  marginX: 0.9,
                  textTransform: "capitalize",
                  placeSelf: "center",
                  lineHeight: 1.4,
                  // marginTop: 1.5,
                  "&:hover": {
                    backgroundColor: "#85aff7",
                    color: "#3c52b2",
                  },
                }}
              >
                Initiate RFQ
              </Button>
              )
              // <Button
              //   onClick={handleInitiateRFQ}
              //   sx={{
              //     bgcolor: "#5F94F5",
              //     height: 40,
              //     width: 40,
              //     color: "#e8e8e8",
              //     fontSize: 9,
              //     marginX: 0.9,
              //     textTransform: "capitalize",
              //     placeSelf: "center",
              //     lineHeight: 1.4,
              //     // marginTop: 1.5,
              //     "&:hover": {
              //       backgroundColor: "#85aff7",
              //       color: "#3c52b2",
              //     },
              //   }}
              // >
              //   {InitiateRq ? "Cancel RFQ" : "Initiate RFQ"}
              // </Button>


            )
          }
          <CardActionArea
            sx={{
              backgroundColor: hideRQ && secondCounter > 50 ? '#26BAFC' : onHov ? themes.currentTheme === "dark" ? '#434354' : '#f9f9f9' : 'transparent',
              width: 110,
              height: 55,
              borderRadius: 1,
              paddingX: 2,
              paddingY: 1.5,
              transition: 'background-color 0.8s',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
              "&:hover": { backgroundColor: hideRQ ? "#26BAFC" : ''}
            }}
            onClick={() => {
              hideRQ && setBuySellValue("buy");
              hideRQ && setBuySell(true);
            }}
          >
            {InitiateRq ? (
              <Typography
                sx={{
                  marginTop: 1,
                  fontSize: 12,
                  alignSelf: 'center'
                }}
              >
                Requesting
              </Typography>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: 9,
                    color: hideRQ && secondCounter > 50 ? 'white' : '#949596',
                    // fontWeight: 'bold'
                  }}
                >
                  BUY
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    // alignSelf: "center",
                    marginTop: 0.5
                  }}
                >
                  {inputValue && inlargedNum(buyValue, "BUY")}
                </Typography>
                {secondCounter < 10 && hideRQ && ( <Typography
                  sx={{
                    fontSize: 8,
                    color:'red',
                    textAlign: 'center',
                    width: 80,
                    marginTop: -1.5
                  }}
                >
                  Expired  
                </Typography>)}
              </>
            )}
          </CardActionArea>
        </div>

        <div
          style={{
            display: "flex",
            placeSelf: "center",
            marginRight: 25,
            marginTop: 8,
            // backgroundColor: "red",
            justifyContent: "center",
            // alignItems: "center",
            // border: "1px solid gray",
          }}
        >
          <Typography
            sx={{
              placeSelf: "center",
              marginTop:0,
              color: "gray",
              fontSize: 10,
            }}
          >
            USDT {" "}
          </Typography>
          <Input
          sx={{
            marginLeft: 0.5,
            width: 80,

            fontSize: 10,
            '& input': {
              // backgroundColor: 'gray',
              // marginBottom: -0.2,
              textAlign: 'center', // Center the text inside the input field
              border: 'none', // Set border-bottom color to gray

            },
           
          }}
            value={text && parseInt(text).toLocaleString("en-US")}
            placeholder="1,000,000"
            onChange={(e) => setText(formatNumber(e.target.value))}
          />
        </div>
        {hideRQ && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 10
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                color: 'gray'
              }}
            >
              {secondCounter.toString().substr(0, 1) + " seconds"}
            </Typography>
            <LinearProgress
              sx={{ width: 150, marginTop: 0, borderRadius: 50 }}
              variant="determinate"
              value={progress}
            />
            <Button
              onClick={handleReject}
              sx={{
                backgroundColor:
                  themes.currentTheme === "dark" ? "#47474c" : "#f2f2f2",
                color: themes.currentTheme === "dark" ? "white" : "#000000",
                fontSize: 8,
                textTransform: "capitalize",
                placeSelf: "end",
                lineHeight: 1.5,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                "&:hover": {
                  backgroundColor: "#3f3f3f",
                  color: "gray",
                },
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </>
    </Card>
  );
}
