import React from 'react';
import { Box, Paper, Grid, Typography, TableContainer, Table, TableRow, TableCell, TableBody, Checkbox, TextField, Link, Button, Stack } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function CartComponent({ data, handleQuantityChange, handlePlaceOrder, handleSelectedProduct, selected, checkOutState }) {
    return (
      <Box sx={{ padding: "10px", backgroundColor: "white", minWidth: '100vh' }}>
        <Paper style={{ padding: '15px', backgroundColor: "transparent" }} elevation={0}>
          <Grid item container
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '15px' }}
          >
  
            <Grid item xs={12} sm={8} style={{ marginBottom: '20px' }}>
              <TableContainer>
                <Table>
                  <TableRow style={{ backgroundColor: '#8fb136' }}>
                    {checkOutState === false && <TableCell><Checkbox style={{ color: 'white' }} /></TableCell>}
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Name</TableCell>
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Quantity</TableCell>
                    <TableCell style={{ fontSize: '18px', color: "white" }}>Subtotal</TableCell>
                  </TableRow>
  
                  <TableBody>
                    {data.map((row, idx) => (
                      <TableRow key={row.name}>
                         {checkOutState === false && <TableCell><Checkbox onClick={()=>handleSelectedProduct(row, idx)}/></TableCell>}
                        <TableCell>
                          <Grid item container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} sm={3}>
                              <img src={row.Image} alt="" style={{ width: '100%', height: '180px' }} />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                              <div><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{row.ProductName}</Typography></div>
  
                              {row.Price !== undefined &&
                                <div><Typography variant="subtitle1">RM {Number(row.Price).toFixed(2)}</Typography></div>
                              }
  
                              <Link
                                component="button"
                                underline="none"
                                variant="caption"
                                style={{ color: 'red' }}
                                onClick={() => {
                                  console.info("I'm a button.");
                                }}
                              >
                                Remove
                              </Link>
                            </Grid>
  
                          </Grid>
                        </TableCell>
                        <TableCell>
                        {checkOutState === false ?
                          <TextField
                            variant= "outlined" 
                            value={row.Quantity}
                            style={{ width: '60px', height: "60px" }}
                            inputProps={{
                              style: {
                                fontSize: '16px',
                                textAlign: 'center',
                                color: 'black',
                              },
                            }}
                            onChange={(e) => handleQuantityChange(idx, e.target.value)}
                          />
                          : <Typography variant='subtitle1' style={{textAlign:"center"}}>{row.Quantity}</Typography>
                        }
                        </TableCell>
                        <TableCell><Typography variant='subtitle1'>RM {Number(row.Total).toFixed(2)}</Typography></TableCell>
  
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
                <Button variant='contained' onClick={() => handlePlaceOrder()} style={{ borderRadius: '30px', backgroundColor: selected.length === 0 ? '#D1D1D1' : '#8fb136',
    color: selected.length === 0 ? 'white' : 'white', textTransform: 'none' }}
                disabled={selected.length === 0 }
                >
                  <Stack direction="row" spacing={2} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant='subtitle1' style={{ fontWeight: 'bold', padding: '5px' }}>Proceed to Order</Typography>
                    <ArrowRightAltIcon style={{ color: "white" }} />
                  </Stack>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
  
  export default CartComponent;
  