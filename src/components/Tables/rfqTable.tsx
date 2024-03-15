import { Typography,TextField } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams,GridRowParams  } from '@mui/x-data-grid';
import * as React from "react"
import {CustomThemeContext} from "@/themes/CustomThemeContext";



const columns: GridColDef[] = [
    { field: 'transactTime', headerName: 'Transact Time', width: 200 },
    { field: 'sideSymbol', headerName: 'Side Symbol', width: 200 },
    { field: 'filledQty', headerName: 'Filled Quantity', width: 200 },
    { field: 'filledPrice', headerName: 'Filled Price', width: 200 },
    { field: 'accountNum', headerName: 'Account Number', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  interface RowData {
    id:string;
    transactTime: string;
    sideSymbol: string;
    filledQty: string;
    filledPrice: string;
    accountNum : string;
    status: string;
  }
  
  interface RFQTableProps {
    rows: RowData[];
  }


export default function RFQTable(props: RFQTableProps) {
    const { rows } = props;
    const [filterText, setFilterText] = React.useState('');
    const themes = React.useContext(CustomThemeContext);


    const filteredRows = rows.filter(row => {
      return (
          row?.filledQty?.toLowerCase().includes(filterText.toLowerCase())
          // Add more conditions for other columns as needed
      );
  });

 
  const handleDownloadCsv = ()=>{
    // const headers = "Transact Time Side Symbol Filled Quantity Filled Price Account Number Status"; // Add your column keys here
    // const rows = filteredRows?.map(item => `${item.transactTime},${item.sideSymbol},${item.filledQty},${item.filledPrice},${item.accountNum},${item.status}`).join('\n');
    // const csvContent = "data:text/csv;charset=utf-8," + headers + '\n' + rows;
    // const encodedUri = encodeURI(csvContent);
    // const link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "RT-Blottar.csv");
    // document.body.appendChild(link);
    // link.click();

         // Create the CSV content from the data array
    let csvContent = "Transact Time, Side Symbol, Filled Quantity, Filled Price, Account Number, Status\n";
    filteredRows?.forEach((item, key) => {
    csvContent += `${item.transactTime},${item.sideSymbol},${item.filledQty},${item.filledPrice},${item.accountNum},${item.status}\n`;
  });

  // Create a Blob object from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Symbol_Data.csv";

  // Simulate a click on the anchor element to trigger the download
  link.click();
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
};


  return (
    <div style={{ height: '24rem', width: '100%',backgroundColor:themes.currentTheme === "dark" ? "#3b3b44" : "#F9F9F9",padding:10 }}>
      <div style={{ height: "5%", width: '100%',display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"30px" }}>
        <Typography variant="h5" sx={{ paddingTop: "20px" }}>Trades</Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 10,paddingTop:20 }}>
            <span style={{ cursor: "pointer" }} onClick={handleDownloadCsv}>
              <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 25"><g fill="none" fill-rule="evenodd"><g fill="currentColor"><path d="M11.278 9.198c.334.256.4.732.15 1.07l-4.713 6.374a.745.745 0 0 1-1.052.148.772.772 0 0 1-.15-1.072l4.713-6.373a.745.745 0 0 1 1.052-.147z"></path><path d="M5.663 9.198a.772.772 0 0 0-.15 1.07l4.713 6.374a.745.745 0 0 0 1.052.148.772.772 0 0 0 .15-1.072L6.715 9.345a.745.745 0 0 0-1.052-.147z"></path></g><path fill-rule="nonzero" stroke="currentColor" stroke-width="1.949" d="M1.355 5.876a.585.585 0 0 0-.38.548v12.152c0 .244.151.463.38.548l12.882 4.803a.585.585 0 0 0 .789-.548V1.621a.585.585 0 0 0-.79-.548L1.356 5.876z"></path></g></svg>
            </span>
          </div>
          <div style={{ marginRight: 6,paddingTop:20 }}>
          <span style={{ cursor: "pointer" }}>
          <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          </span>
          </div>
            <TextField id="standard-basic" onChange={handleFilterChange} value={filterText} label="Filter" variant="standard" />
        </div>
      </div>
      <div style={{ height: "85%", width: '100%' }}>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </div>

    </div>
  )
}
