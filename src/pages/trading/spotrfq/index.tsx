import PageTitle from "@/components/TextDisplay/PageTitle";
import SubTitle from "@/components/TextDisplay/SubTitle";
// import Tile from "@/components/RFQ Tile/Tile";
import { Box, CardMedia, IconButton, SvgIcon, Paper, Avatar } from "@mui/material";
import HLOGO from "../../../../src/Images/dark.png"
import {CurrencyPair} from "@/services/currencyPairs";
import { combineLatest, merge } from "rxjs"
import { combineKeys } from "@react-rxjs/utils"
import { map } from "rxjs/operators"
import { Tile, tile$ } from "@/components/Tile"
import {currencyPairs$} from "@/services/currencyPairs/currencyPairs.service-mock";
export default function SpotRFQPage() {
    const tiles$ = merge(
        combineKeys(currencyPairs$.pipe(map(Object.keys)), tile$),
    )
    const currencyPairMock: CurrencyPair = {
        symbol: "EURUSD",
        base: "EUR",
        terms: "USD",
        ratePrecision: 5,
        pipsPosition: 4,
        defaultNotional: 1_000_000,
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
        marginTop:3,
      }}
      >
      {/*<Tile />*/}
          <Tile
              currencyPair={currencyPairMock}
              isAnalytics={false}
          />
      </Box>

    </>
  );
}