import { Typography, TextField, useMediaQuery, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowParams,
} from "@mui/x-data-grid";
import * as React from "react";
import { CustomThemeContext } from "@/themes/CustomThemeContext";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import EventOutlined from "@mui/icons-material/EventOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import AppDatePicker from "../common/inputs/AppDatePicker";
import Picker from "./DPicker";

const columns: GridColDef[] = [
  { field: "transactTime", headerName: "Transact Time", width: 200 },
  { field: "symbol", headerName: "Symbol", width: 200 },
  { field: "side", headerName: "Side", width: 200 },
  { field: "filledQty", headerName: "Filled Quantity", width: 200 },
  { field: "filledPrice", headerName: "Filled Price", width: 200 },
  // { field: 'accountNum', headerName: 'Account Number', width: 200 },
  { field: "status", headerName: "Status", width: 200 },
];

interface RowData {
  id: string;
  transactTime: string;
  symbol: string;
  side: string;
  filledQty: string;
  filledPrice: string;
  accountNum: string;
  status: string;
}

interface RFQTableProps {
  rows: RowData[];
}

export default function RFQTable(props: RFQTableProps) {
  const { rows } = props;
  const [filterText, setFilterText] = React.useState("");
  const themes = React.useContext(CustomThemeContext);
  const [startCalendar, setStartCalendar] = React.useState<boolean>(false);
  const [endCalendar, setEndCalendar] = React.useState<boolean>(false);
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");
  const columnsWithDynamicWidth = columns.map((column) => ({
    ...column,
    width: 260, // isSmallerThan600 ? 150 : 200,
  }));

  const filteredRows = rows.filter((row) => {
    return (
      row?.filledQty?.toLowerCase().includes(filterText.toLowerCase()) ||
      row?.filledPrice?.toLowerCase().includes(filterText.toLowerCase())
      // Add more conditions for other columns as needed
    );
  });

  const handleDownloadCsv = () => {
    // Create the CSV content from the data array
    let csvContent =
      "Transact Time, Symbol,Side, Filled Quantity, Filled Price, Account Number, Status\n";
    filteredRows?.forEach((item, key) => {
      csvContent += `${item.transactTime},${item.symbol},${item.side},${item.filledQty},${item.filledPrice},${item.accountNum},${item.status}\n`;
    });

    // Create a Blob object from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Symbol_Data.csv";

    // Simulate a click on the anchor element to trigger the download
    link.click();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const getRowClassName = (params: any) => {
    let num = Number(params.id);
    return num % 2 != 0
      ? themes.currentTheme === "dark"
        ? "evenDarkRow"
        : "evenLightRow"
      : "";
  };

  return (
    <div
      style={{
        height: "24rem",
        width: "100%",
        backgroundColor: themes.currentTheme === "dark" ? "#3b3b44" : "#F9F9F9",
        padding: 10,
      }}
    >
      <div
        style={{
          height: "5%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ paddingTop: "20px" }}
          className="tableHeading"
        >
          Recent Transactions
        </Typography>
        <div
          className="tableHeaderRight"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className="iconMargin"
            style={{ marginRight: 10, paddingTop: 20 }}
          >
            <span style={{ cursor: "pointer" }} onClick={handleDownloadCsv}>
              <svg
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 25"
                style={{
                  marginTop:5
                }}
              >
                <g fill="none" fillRule="evenodd">
                  <g fill="currentColor">
                    <path d="M11.278 9.198c.334.256.4.732.15 1.07l-4.713 6.374a.745.745 0 0 1-1.052.148.772.772 0 0 1-.15-1.072l4.713-6.373a.745.745 0 0 1 1.052-.147z"></path>
                    <path d="M5.663 9.198a.772.772 0 0 0-.15 1.07l4.713 6.374a.745.745 0 0 0 1.052.148.772.772 0 0 0 .15-1.072L6.715 9.345a.745.745 0 0 0-1.052-.147z"></path>
                  </g>
                  <path
                    fillRule="nonzero"
                    stroke="currentColor"
                    strokeWidth="1.949"
                    d="M1.355 5.876a.585.585 0 0 0-.38.548v12.152c0 .244.151.463.38.548l12.882 4.803a.585.585 0 0 0 .789-.548V1.621a.585.585 0 0 0-.79-.548L1.356 5.876z"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
       <div
       style={{
        flexDirection:'row',
        display:'flex'
       }}
       >
           {/* From Date */}
           <div
            style={{
              flexDirection: "column",
              display: "flex",
              marginRight:10
              // backgroundColor:'red'
            }}
          >
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                // height: 45,
                // width: 110,
                paddingTop: 5,
                marginRight: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "gray",
                  }}
                >
                  From Date*
                </Typography>
                <HelpOutline
                  sx={{
                    color: "gray",
                    fontSize: 10,
                    marginLeft: 0.5,
                    marginTop: 0.5,
                  }}
                />
              </div>
            </div>
            <Picker/>
          </div>
          {/* From Date */}

          {/* To Date */}
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              marginLeft:10
              // backgroundColor:'red'
            }}
          >
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                // height: 45,
                // width: 110,
                paddingTop: 5,
                marginRight: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "gray",
                  }}
                >
                  To Date*
                </Typography>
                <HelpOutline
                  sx={{
                    color: "gray",
                    fontSize: 10,
                    marginLeft: 0.5,
                    marginTop: 0.5,
                  }}
                />
              </div>
            </div>
            <Picker/>
          </div>
          {/* To Date */}
       </div>

        </div>
      </div>
      <div style={{ height: "85%", width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columnsWithDynamicWidth}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // getRowClassName={getRowClassName}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? themes.currentTheme === "dark"
                ? "evenDarkRow"
                : "evenLightRow"
              : ""
          }
        />
      </div>
    </div>
  );
}
