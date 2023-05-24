import React, { useState }  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid,Typography, Paper, Stack, RadioGroup, Radio, FormControlLabel, Box, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import bankList from './bankList.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CheckOutPage({makePayment}) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    console.log('e')
    setSelectedValue(event);
  };

  const PAYMENT_OPTIONS = [
    {
        value: 1,
        title: 'Online Banking',
        description: 'You will be redirected to PayPal website to complete your purchase securely.',
        icons: ['https://s-plugins.com/wp-content/uploads/2020/05/fpx-gateway-icon.png'],
    },
    {
        value: 2,
        title: 'Credit / Debit Card',
        description: 'We support Mastercard, Visa, Discover and Stripe.',
        icons: ['https://icon-library.com/images/visa-mastercard-icon/visa-mastercard-icon-8.jpg'],
    },

    {
      value: 3,
      title:'Sarawak Pay',
      description:"A one-stop mobile app payment channel for public to make payment for bills or purchases via mobile phone",
      icons: ['https://www.theborneopost.com/newsimages/2020/07/sarawak-pay-e1595403312278.jpg']
    }
];

const [bankCode, setBankCode] = useState('');
  return (
    <Grid item xs={12} sm={12}>
      <Paper style={{padding:"3%"}}>
        <Grid item container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Payment Options</Typography>
            </Grid>
            {PAYMENT_OPTIONS.map((y)=>(
            <Grid item xs={12} sm={12} style={{borderRadius:'8px', margin:'1%', padding:'2%', border:"1px solid #E7E9E7"}}>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                    key={y.value}
                    value={y.value}
                    control={<Radio checked={selectedValue === y.value} checkedIcon={<CheckCircleIcon />} />}
                    label={
                        <Box sx={{ ml: 1, display:'flex', flexDirection:"column", justifyContent:"center" }}>
                            <Typography variant="subtitle2">{y.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {y.description}
                            </Typography>
                            {y.title === 'Online Banking' &&
                               <FormControl fullWidth size="small" style={{marginTop:"4%"}}>
                               <InputLabel id="demo-select-small-label">Bank</InputLabel>
                               <Select
                                   labelId="demo-select-small-label"
                                   id="demo-select-small"
                                   required
                                   value={bankCode}
                                   label="Bank"
                                   onChange={(e)=>setBankCode(e.target.value)}
                               >
                                   {bankList.map((bnk)=>(
                                   <MenuItem value={bnk.code}>
                                       {bnk.name}
                                   </MenuItem>
                                   ))}
                               </Select>
                              </FormControl>
                            }
                        </Box>
                    }
                    sx={{ py: 3, pl: 2.5, flexGrow: 1, mr: 0 }}
                    onChange={() => handleChange(y.value)}
                />
                  {y.icons.map((icon) => (
                    <img src={icon} alt="logo card" style={{ width: '5%', height:'5%'}} />
                ))}
              </Stack>
            </Grid>
             ))}
        </Grid>

        <Button variant='contained' onClick={() => makePayment()} style={{ borderRadius: '30px', backgroundColor: '#8fb136',
                                        color: 'white', textTransform: 'none' }}
                                      fullWidth
                                        >
          <Stack direction="row" spacing={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='subtitle1' style={{ fontWeight: 'bold', padding: '5px' }}>Make Payment</Typography>
          </Stack>
        </Button>
      </Paper>
    </Grid>
  );
}
