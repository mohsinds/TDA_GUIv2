import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar
} from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import LinearProgress from "@mui/material/LinearProgress";
import { CustomThemeContext } from "@/themes/CustomThemeContext";
// import asd from '../../components/Images/commitment.jpg'
// import "../../components/Images/ec_logo-removebg-preview.png"


export default function Tile() {
  const themes = React.useContext(CustomThemeContext);
  const [inputValue, setInputValue] = React.useState(false);
  const [InitiateRq, setInitRq] = React.useState(false);
  const [hideRQ, setHideRq] = React.useState(false);
  const [rejet, setRejet] = React.useState(false);
  const [buyValue, setBuyValue] = React.useState("0.28376");
  const [sellValue, setSellValue] = React.useState("1.028476");
  const [iniNum, setInitNumb] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [buySell, setBuySell] = React.useState(false);
  const [buySellValue, setBuySellValue] = React.useState("");

  const formatNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    // Format the number as desired
    const formattedValue = parseInt(numericValue).toLocaleString("en-US");
    // Update the state with the formatted value
    setInitNumb(formattedValue);
    // Return the unformatted numeric value for input display
    return numericValue;
  };

  const inlargedNum = (value, valueOf) => {
    // if (value === "sell") {
    //   return ""; // Return empty string if sellValue is "sell"
    // }
    console.log("value", value, "valueof", valueOf);
    const xxx = value?.split(".")[1];
    const yyy = value?.split(".")[0];
    return (
      <>
        <Typography
          sx={{
            display: "flex",
            fontSize: 15,
            alignItems: "end",
            marginTop: -3,
            color: valueOf === "BUY" ? "green" : "red",
          }}
        >
          {yyy + "." + xxx?.substr(0, 2)}
          <Typography
            sx={{
              fontSize: 30,
            }}
          >
            {xxx?.substr(2, 2)}
          </Typography>
          {xxx?.substr(4, 10)}
        </Typography>
      </>
    );
  };

  const progBar = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  };

  const buySellCard = (val, call) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // backgroundColor:'yellow',
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
        <Typography>
          You {call} {" USDT " + iniNum} at a rate of {val}
        </Typography>
        <Button
          sx={{
            color: "white",
            alignSelf: "center",
            backgroundColor: buySellValue === "sell" ? "green" : "#F64A69",
            borderRadius: 50,
            padding: 1,
            fontSize: 10,
          }}
          onClick={() => {
            setBuySell(false);
            // setRejet(true);
            // setInputValue(true);
            inlargedNum("1.23457", "SELL");
            // iniNum !== "" && setInputValue(true);
            // setRejet(true);
            // inlargedNum(sellValue, "SELL");
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
    }, 2000);
  };

  return buySell ? (
    <Card
      sx={{
        display: "flex",
        height: 210,
        width: 380,
        paddingX: 3,
        paddingY: 2,
        flexDirection: "column",
        backgroundColor: buySell
          ? buySellValue === "sell"
            ? "green"
            : "#F5264B"
          : "",
      }}
    >
      <CardContent>{buySellCard(sellValue, "sold")}</CardContent>
    </Card>
  ) : (
    <Card
      sx={{
        display: "flex",
        height: 210,
        width: 380,
        paddingX: 3,
        paddingY: 2,
        flexDirection: "column",
        backgroundColor: buySell
          ? buySellValue === "sell"
            ? "green"
            : "#F5264B"
          : "",
      }}
    >
      <>
        <Typography>USDT/USD</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "blue",
            marginTop: 5.5,
          }}
        >
          <CardActionArea
            sx={{
              backgroundColor:
                themes.currentTheme === "dark" ? "#47474c" : "#f2f2f2",
              width: 100,
              height: 60,
              paddingX: 1.5,
            }}
            onClick={() => {
              // setSellValue("sell");
              iniNum !== '' && setBuySellValue("buy");
              iniNum !== '' && setBuySell(true);
            }}
          >
            {InitiateRq ? (
              <Typography>Requesting</Typography>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: 13,
                  }}
                >
                  SELL
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    alignSelf: "center",
                  }}
                >
                  {inputValue && inlargedNum(sellValue, "SELL")}
                </Typography>
              </>
            )}
          </CardActionArea>
          {!hideRQ && (
            <Button
              onClick={() => {
                iniNum !== "" && cancelRequest();
                iniNum !== "" && setInputValue(true);
                iniNum !== "" && setRejet(true);
                setBuyValue("0.23476");
                setSellValue("1.23745");
                progBar();
              }}
              sx={{
                bgcolor: "#5F94F5",
                height: 50,
                width: 40,
                color: "#e8e8e8",
                fontSize: 9,
                textTransform: "capitalize",
                placeSelf: "center",
                lineHeight: 1.5,
                marginTop: 1.5,
                "&:hover": {
                  backgroundColor: "#85aff7",
                  color: "#3c52b2",
                },
              }}
            >
              {InitiateRq ? "Cancel RFQ" : "Initiate RFQ"}
            </Button>
          )}
          <CardActionArea
            sx={{
              backgroundColor:
                themes.currentTheme === "dark" ? "#47474c" : "#f2f2f2",
              width: 100,
              height: 60,
              paddingX: 1.5,
            }}
            onClick={() => {
              // setSellValue("sell");
              iniNum !== '' && setBuySell(true);
              iniNum !== '' && setBuySellValue("sell");
            }}
          >
            {InitiateRq ? (
              <Typography>Requesting</Typography>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: 13,
                  }}
                >
                  BUY
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    alignSelf: "center",
                  }}
                >
                  {inputValue && inlargedNum(sellValue, "BUY")}
                </Typography>
              </>
            )}
          </CardActionArea>
        </div>

        <div
          style={{
            display: "flex",
            placeSelf: "center",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            width: 200,
          }}
        >
          <Typography
            sx={{
              placeSelf: "center",
              marginTop: 1.5,
              color: "gray",
              fontSize: 11,
            }}
          >
            USDT{" "}
          </Typography>
          <Input
            sx={{ marginLeft: 1, width: 80 }}
            value={iniNum && parseInt(iniNum).toLocaleString("en-US")}
            placeholder="1,000,000"
            onChange={(e) => setInitNumb(formatNumber(e.target.value))}
          />
        </div>
        {rejet && hideRQ && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <LinearProgress
              sx={{ width: 150, marginTop: 2, borderRadius: 50 }}
              variant="determinate"
              value={progress}
            />
            {/* {progress < 100 && ( */}
              <Button
                onClick={() => {
                  setInputValue(false);
                  setRejet(false);
                  setProgress(0);
                  setInitNumb("");
                  // setInitRq(false)
                  setHideRq(false);
                }}
                sx={{
                  backgroundColor:
                    themes.currentTheme === "dark" ? "#47474c" : "#f2f2f2",
                  // height:30,
                  // width:30,
                  //   color: "#000",
                  color: themes.currentTheme === "dark" ? "white" : "#000000",
                  fontSize: 8,
                  textTransform: "capitalize",
                  placeSelf: "end",
                  lineHeight: 1.5,
                  marginTop: 1.5,
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
            {/* )} */}
          </div>
        )}
        {/* <Avatar alt="" src="/components/Images/commitment.jpg" /> */}
        {/* <Avatar alt="" src="vercel.svg" /> */}
      </>
    </Card>
  );
}
