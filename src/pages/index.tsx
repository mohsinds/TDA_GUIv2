import PageTitle from "@/components/TextDisplay/PageTitle"
import SpotRFQPage from "./trading/rfq"

export default function HomePage() {
  return (
    <>
      {/* <PageTitle sx={{ textWrap: "nowrap", minWidth: "300px" }}>Home Page</PageTitle> */}
      <SpotRFQPage/>
    </>
  )
}