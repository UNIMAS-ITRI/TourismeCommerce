import React,{useState} from 'react';
import { Box, Paper, Grid, Typography, TableContainer, Table, TableRow, TableCell, TableBody, Checkbox, TextField, Link, Button, Stack } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CheckOutPage from './CheckOutPage';
import { render } from '@testing-library/react';

const CostSummary = ({total, totalIncTax}) => {
  let data = [{
    title:'Subtotal', value: total.toFixed(2)},
    {title:'Tax', value: (total*0.05).toFixed(2)},
    {title:'Total', value: totalIncTax.toFixed(2)
  }];
  return(
      <div style={{marginBottom:'8%',borderTop:'3px solid #8fb136', borderBottom:'3px solid #8fb136'}}>
        {data !== undefined && data.map((x)=>(
        <Stack direction="row" spacing="2" style={{display:"flex", flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Typography variant="subtitle1">{x.title}</Typography>
          <Typography variant="subtitle1">RM {x.value}</Typography>
        </Stack> 
        ))} 
      </div>
  )
}

function CartComponent({ data, handleQuantityChange, handlePlaceOrder, handleSelectedProduct, selected, checkOutState, handleCheckOut, handlePayment, paymentState,purchaseSuccessState, backStep}) {
  let renderData = checkOutState === false ? data : selected;
  let totalPrice = renderData.reduce((accumulator, item) => accumulator + item.Price, 0);
  let totalIncTax = (totalPrice * 0.05) + totalPrice

  const [deleteData, setDeleteData] = useState([]);

  const clickedRemoveID = (id) => {
    setDeleteData([...deleteData, id]);
  }

    return (
      <Box sx={{ padding: "10px", minWidth: '100vh' }}>
        <Paper style={{ padding: '15px', backgroundColor: "transparent" }} elevation={0}>
          
          <Grid item container
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '15px' }}
          >
            <Grid item xs={12} sm={8} style={{ marginBottom: '10px' }}>
              <TableContainer >
                <Table>
                  <TableRow style={{ backgroundColor: '#8fb136' }}>
                    {checkOutState === false && <TableCell><Checkbox style={{ color: 'white' }} /></TableCell>}
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Name</TableCell>
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Quantity</TableCell>
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Subtotal</TableCell>
                  </TableRow>
  
                  <TableBody>
                    {renderData.filter(item => !deleteData.includes(item.id)).map((row, idx) => (
                      <TableRow key={row.name}>
                         {checkOutState === false && <TableCell style={{border:'none'}}><Checkbox onClick={()=>handleSelectedProduct(row, idx)}/></TableCell>}
                        <TableCell style={{border:'none'}}>
                          <Grid item container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} sm={3}>
                              <img src={row.Image} alt="" style={{ width: '100%', height: '180px' }} />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                              <div><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{row.ProductName}</Typography></div>
  
                              {row.Price !== undefined &&
                                <div><Typography variant="subtitle1">RM {Number(row.Price).toFixed(2)}</Typography></div>
                              }

                            {paymentState === false && purchaseSuccessState === false &&
                              <Link
                                component="button"
                                underline="none"
                                variant="caption"
                                style={{ color: 'red' }}
                                onClick={() => {
                                  clickedRemoveID(row.id)
                                }}
                              >
                                Remove
                              </Link>
                            }
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell style={{border:'none'}}>
                        {checkOutState === false ?
                          <input
                            type="text"
                            className="custom-textfield"
                            value={row.Quantity}
                            onChange={(e) => handleQuantityChange(idx, e.target.value)}
                            style={{
                              border: '1px solid gray',
                              width:'50px',
                              height:"50px",
                              textAlign:'center',
                              padding: '8px',
                              fontSize: '16px',
                              color: 'black',
                            }}
                          />
                          : <Typography variant='subtitle1' style={{textAlign:"left"}}>{row.Quantity}</Typography>
                        }
                        </TableCell>
                        <TableCell style={{border:'none'}}><Typography variant='subtitle1'>RM {Number(row.Total).toFixed(2)}</Typography></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
  
          </Grid>
  
          <Grid item container
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '15px' }}
          >
            <Grid item xs={12} sm={8} justify="right" alignItems="right" style={{ marginTop: '10px' }}>
              <div style={{ display: "flex", justifyContent: "right" }}>

              {checkOutState === false  ?
                <Button variant='contained' onClick={() => handlePlaceOrder()} style={{ borderRadius: '30px', backgroundColor: selected.length === 0 ? '#D1D1D1' : '#8fb136',
                color: selected.length === 0 ? 'white' : 'white', textTransform: 'none' }}
                disabled={selected.length === 0 }
                >
                  <Stack direction="row" spacing={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant='subtitle1' style={{ fontWeight: 'bold', padding: '5px' }}>Proceed to Order</Typography>
                    <ArrowRightAltIcon style={{ color: "white" }} />
                  </Stack>
                </Button>
                : 
                purchaseSuccessState === false && paymentState === false &&
                <Grid item xs={12} sm={8}>
                  <Grid item container
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Grid item xs={12} sm={4}>
                                <CostSummary
                                  total={totalPrice}
                                  totalIncTax={totalIncTax}
                                />
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                      <Button variant='contained' onClick={() => handleCheckOut()} style={{ borderRadius: '30px', backgroundColor: selected.length === 0 ? '#D1D1D1' : '#8fb136',
                                        color: selected.length === 0 ? 'white' : 'white', textTransform: 'none' }}
                                        disabled={selected.length === 0 }
                                        >
                                          <Stack direction="row" spacing={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Typography variant='subtitle1' style={{ fontWeight: 'bold', padding: '5px' }}>Proceed to Checkout</Typography>
                                            <ArrowRightAltIcon style={{ color: "white" }} />
                                          </Stack>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                          
                        </Grid>
                </Grid>
               
                }
              </div>
            </Grid>
        {paymentState === true &&
            <Grid item xs={12} sm={8} style={{marginTop:"3%"}}>
                    <CheckOutPage makePayment={handlePayment}/>
            </Grid>
        }

          </Grid>
        
        </Paper>
      </Box>
    );
  }
  
  export default CartComponent;
  