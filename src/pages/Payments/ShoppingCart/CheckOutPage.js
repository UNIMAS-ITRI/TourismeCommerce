import React, { useState }  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Stack, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, Select, MenuItem, TextField, InputAdornment, IconButton} from '@mui/material';
import bankList from './bankList.json';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CardPayment = () =>{
    return(
        <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center',padding:"4%", marginLeft:'4%', marginRight:'4%'}}>
            <Grid item xs={12} sm={2}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:"10px", alignItems:'center'}}>
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQM7yc5ap4p_79bQ90vm973HUcqh3W1Sqt-hNadFoO9fYMvhNPO" alt="img" style={{width:'100%', height:'100%'}}/>
            </div>
                <Stack direction="column" spacing={2} >
                    <Stack spacing={2} direction="column" style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <input
                            type="text"
                            className="custom-textfield"
                            placeholder='4632100323210050'
                            // onChange={(e) => handleQuantityChange(idx, e.target.value)}
                            style={{
                              border: '1px solid gray',
                              width:'300px',
                              padding: '8px',
                              fontSize: '16px',
                              color: 'black',
                            }}
                          />
                    <input
                    type="text"
                    className="custom-textfield"
                    placeholder='John Doe'
                    // onChange={(e) => handleQuantityChange(idx, e.target.value)}
                    style={{
                        border: '1px solid gray',
                        width:'300px',
                        padding: '8px',
                        fontSize: '16px',
                        color: 'black',
                    }}
                    />
                    <Stack direction="row" spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                          <input
                            type="text"
                            className="custom-textfield"
                            placeholder='22/22'
                            // onChange={(e) => handleQuantityChange(idx, e.target.value)}
                            style={{
                              border: '1px solid gray',
                              width:'143px',
                              padding: '8px',
                              fontSize: '16px',
                              color: 'black',
                            }}
                          />
                          <input
                            type="text"
                            className="custom-textfield"
                            placeholder='CVC'
                            // onChange={(e) => handleQuantityChange(idx, e.target.value)}
                            style={{
                              border: '1px solid gray',
                              width:'143px',
                              padding: '8px',
                              fontSize: '16px',
                              color: 'black',
                            }}
                          />
                          </Stack>
                          <FormControl style={{width:'300px'}}>
                                    <FormLabel id="demo-radio-buttons-group-label">Card Type</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Master Card" />
                                        <FormControlLabel value="male" control={<Radio />} label="Visa Card" />
                                    </RadioGroup>
                        </FormControl>
                    </Stack>
                 
                </Stack> 
              
            </Grid>
         
        </Grid>
    )
}

const Ewallet_Payment = () => {
    const [selected, setSelected] = useState(false);
  
    const handleRadioChange = () => {
      setSelected(!selected);
    };
  
    return (
      <Grid item container spacing={2} style={{padding:"4%", marginLeft:'4%', marginRight:'4%'}}>
        <Grid item xs={12} sm={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
           <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            checked={selected}
            onChanged={()=> handleRadioChange}>
            <FormControlLabel value="SarawakPay" control={<Radio />}/>
        </RadioGroup>
          <img
            src="https://play-lh.googleusercontent.com/_N6rLvVI8wwp8kCGEaAQBJtFBOwA62JUSp5vDxwBUDq1J0XCi8W4Wit3ECwdrwn3fyrr"
            alt="SarawakPay"
            style={{ width: '100%', height: '100%' }}
          />
         
        </Grid>
      </Grid>
    );
  };

  const FpxPaymentForm = () => {
    const [bankCode, setBankCode] = useState('');
    const [name, setName] = useState('Karen Moses');
    const [email, setEmail] = useState('karen@gmail.com');
    return (
    <Grid item container style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'4%', marginBottom:"4%"}}>
        <Grid item xs={12} sm={4}>
     <Stack direction="column" spacing={2} >
        <FormControl fullWidth size="small">
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
      
            <TextField
            fullWidth
            size='small'
            required
            id="outlined-required"
            label="Name"
            value={name}
            onChange={(e) =>setName(e.target.value)}
            />

        <TextField
            fullWidth
            size='small'
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            />
      
     </Stack>
     </Grid>
     </Grid>
    );
  };

  const Paypal_Payment = () => {
    const [email, setEmail] = useState('karen@gmail.com');
    const [password, setPassword] = useState('abc1234');
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    return(
        <Grid item container spacing={2} style={{padding:"4%", marginLeft:'4%', marginRight:'4%',display:'flex', flexDirection:'row', justifyContent:'center'}}>
            <Grid item xs={12} sm={12} >
                <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <Grid item xs={12} sm={4} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <img src="https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png" alt="paypal" style={{width:"50%"}}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} >
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='subtitle1' color="primary">Log into Paypal</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <TextField
                            fullWidth
                            size='small'
                            required
                            id="outlined-required"
                            label="Email"
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        size="small"
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                        </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
  }

export default function CheckOutPage({makePayment}) {
  const [value, setValue] = React.useState(0);

  const tabValue = ['CREDIT/DEBIT CARD', 'E-WALLET', 'FPX', 'PAYPAL'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabPage = () => {
    switch(value){
        case 0:
            return <CardPayment/>;
        case 1:
            return <Ewallet_Payment/>;
        case 2:
            return <FpxPaymentForm/>;
        case 3:
            return <Paypal_Payment/>;
        default:
            break;
    }
  }

  return (
    <Stack direction="column" spacing={2}>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
      <Tabs value={value} onChange={handleChange} sx={{ '& .MuiTabs-flexContainer': { gap: '200px', display:'flex'} }}>
        {tabValue.map((tab, idx) => (
          <Tab key={idx} label={tab}/>
        ))}
      </Tabs>
    </div>
    <div>
        {renderTabPage()}
        <Grid item xs={12} sm={12}>
            <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:"center"}}>
                <Grid item xs={12} sm={8}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:"10px", marginTop:"10px", alignItems:'center'}}>
                        <Button fullWidth variant='contained'  onClick={()=> makePayment()} style={{ borderRadius: '30px', backgroundColor:'#8fb136',
                                            color: 'white', textTransform: 'none' }}
                                            >
                        <Typography variant='subtitle1' style={{ fontWeight: 'bold', padding: '5px' }}>Make Payment</Typography>
                    </Button>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    </div>
    </Stack>
  );
}
