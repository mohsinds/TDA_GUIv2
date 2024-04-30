import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function HelperText() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      sx={{
        outline:'none',
        border:'none',
        width:120,
        height:20,
        // backgroundColor:'green'
      }}
        // label="Helper text example"
        // slotProps={{
          
        //   // textField: {
        //   //   helperText: 'MM/DD/YYYY',
        //   // },
        // }}
        slotProps={{ textField: { size: 'small', style: {height:30} } }}
      />
    </LocalizationProvider>
  );
}