import React, { useState }  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Stack, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton} from '@mui/material';

 const PaymentComplete = () => {
  return (

    <Grid item xs={12} sm={8}>
        <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'2%', marginBottom:'2%'}}>
            <Grid item xs={12} sm={12}>
                <Typography variant='h6' style={{color:"black", textAlign:'center'}}>Transaction completed successfully.Thank you for purchasing with us.</Typography>
            </Grid> 
            <Grid item xs={12} sm={12}>
                <Typography variant='body2' style={{color:"black", textAlign:'center'}}>Payment receipt has been sent to your registered email.</Typography>
            </Grid> 
        </Grid>
    </Grid>
  );
}

export default PaymentComplete;
