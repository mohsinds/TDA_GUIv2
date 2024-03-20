import React, { useState } from 'react';
import PageTitle from "@/components/TextDisplay/PageTitle"
import { Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";

export default function FireblockPage() {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date?.$d);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date?.$d);
  };

  const handleSubmit = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    // Perform any other actions here, like sending the dates to an API
  };

  return(
    <>
      <PageTitle sx={{ textWrap: "nowrap", minWidth: "300px" }}>Fireblocks Softledger Export</PageTitle>
      <Box sx={{ 
        display:'flex',
        // justifyContent:'center',
        alignItems:'center',
        marginTop:2, }}
      >
        <DatePicker label="Start Date" value={startDate}  onChange={handleStartDateChange}/>
        <DatePicker label="End Date" value={endDate} onChange={handleEndDateChange} sx={{ marginLeft: 2 }} />
      </Box>
      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 2 }}>Submit</Button>
    </>
    ) 
}
