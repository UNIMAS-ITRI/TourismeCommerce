// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { browserHistory } from "react-router";
import { GitAction } from "../../../store/action/gitAction";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// data stubs
import { toast } from 'react-toastify';
import { IconButton, TableHead, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Checkbox from '@mui/material/Checkbox';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import HandleAddress from './HandleAddress'


class ShopPageCheckOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address:2,
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],
            ProductStockAmountlimit: false,
            overProductStockAmountLimitID: [],
            cart: [],
            subtotal: 0,
            // total: 0,
            // shipping: 25,
            // tax: 0,
            setDetails: false,
            selectedIndex: "",

            MerchantShopName: [],

            // selectedList: [],
            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false,
            open:false,


            // dummy data
            data :[{
                MerchantShopName:'Jual Barang Sdn Bhd',
                Image:"https://www.mycraftshoppe.com/storage/TVpUEqwfMHPDy2qOAXGvYXSpFq8fsx6sOHEQI2Fv.png",
                ProductName:"Orang Ulu Glass Beads Earring",
                Desc: "1 pair unique handcraft earring of Orang Ulu",
                Price: 30,
                Quantity: 1,
                Total: 30,
            },
           { MerchantShopName:'Jual Barang Sdn Bhd',
            Image:"https://cf.bstatic.com/xdata/images/hotel/max1280x900/214872686.jpg?k=6718d84d29397892d8868126483553c65c02f616a389ec2b57f29004266e9f3e&o=&hp=1",
            ProductName:"Kuching Waterfront Hotel Deluxe Room",
            Desc:"null",
            Duration:"3 Days 2 Night",
            Price: 804,
            Quantity: 1,
            Total: 804
        },

            { MerchantShopName:'Jual Barang Sdn Bhd',
            Image:"https://borneo.com.au/wp-content/uploads/2020/10/scv0104-1.jpg",
            ProductName:"Sarawak Cultural Village",
            Desc:"Exploring the unique features of Sarawak.",
            Price: 60,
            Quantity: 1,
            Total: 60,},

        ],
            activeStep: 0,
            skipped: new Set(),

        };
        this.setDetails = this.setDetails.bind(this)
        // this.filterShop = this.filterShop.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleSelectedProduct = this.handleSelectedProduct.bind(this)
        this.handleAllProductSellect = this.handleAllProductSellect.bind(this)
    }

    // Stepper
    getSteps() {
      return ['Check Order', 'Shipping Address'];
    }
    

    handleNext = () => {
      this.setState({activeStep:this.state.activeStep + 1});
    };
  
    handleBack = () => {
      this.setState({activeStep:this.state.activeStep - 1});
    };
  
    handleReset = () => {
      this.setState({activeStep:0});
    };

    // handleDialog
    handleClickOpen = () => {
      this.setState({open:true});
    };
  
    handleClose = () => {
      this.setState({open:false});
    };



    // -----------------------------------------------------
    getItemQuantity(item) {
        var { quantities } = this.state;
        var quantity = quantities.find((x) => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    }

    setDetails(productcart) {
        productcart.map((x) => {
            this.state.cart.push(
                {
                    id: x.UserCartID,
                    product: x,
                    options: [],
                    price: x.ProductPrice,
                    total: x.ProductQuantity * x.ProductPrice,
                    quantity: x.ProductQuantity,
                    MerchantShopName: x.MerchantShopName,
                    MerchantID: x.MerchantID
                }
            )
        })
        this.setState({ isDataSet: true })

        if (this.state.selectedProductDetailList !== [] && this.state.selectedProductDetailList.length > 0) {
            let temp = [...this.state.selectedProductDetailList]
            this.state.selectedProductDetailList.splice(0, this.state.selectedProductDetailList.length)

            temp.map((selectedProduct) => {
                this.state.cart.filter((x) => x.product.UserCartID === selectedProduct.product.UserCartID).map((updatedList, index) => {
                    this.state.selectedProductDetailList.push(updatedList)
                })
            })
            this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
        }
    }

    // filterShop(data) {

    //     console.log("data", data)
    //     let filterList = []
    //     let filterShopName = []
    //     filterList = data !== undefined && data.filter((ele, ind) => ind === data.findIndex(elem => elem.MerchantShopName === ele.MerchantShopName))

    //     filterList !== undefined && filterList.map((x) => {
    //         filterShopName.push(x.MerchantShopName)
    //     })

    //     this.setState({ MerchantShopName: filterShopName })
    // }

    componentDidMount() {
        if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
            this.setDetails(this.props.productcart)
        }

        // if (this.props.history !== undefined)
        //     this.filterShop(this.props.productcart)
        // if (this.props.history === undefined)
        //     this.filterShop(this.props.data)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productcart !== this.props.productcart) {

            if (this.props.productcart.length > 0) {
                this.state.cart.map((x, index) => {
                    this.state.cart.splice(0, this.state.cart.length)
                })
                // this.filterShop(this.props.productcart)
                this.setDetails(this.props.productcart)
            }

        }
    }

    // ---------------------------------------------------- Update Cart Item ------------------------------------

    removeItem(product) {
        this.props.CallDeleteProductCart({ userCartID: product.UserCartID, userID: localStorage.getItem("id"), productName: product.ProductName })
    }

    handleChangeQuantity = (item, quantity) => {
        if (quantity > 0) {
            this.props.CallUpdateProductCart({
                userID: localStorage.getItem("id"),
                userCartID: item.product.UserCartID,
                productQuantity: quantity,
                productName: item.product.ProductName
            })
        }
        this.setState({ selectedIndex: item.id })
    };

    // ---------------------------------------------------- Check Out ------------------------------------

    CheckOutOnClick = (items) => {

        if (localStorage.getItem("id")) {
            let ProductIDs = [];
            let ProductQuantity = [];
            let checkProductStockAmount = [];
            let checkName = [];
            let overProductStockAmountlimit = false
            this.state.overProductStockAmountLimitID.splice(0, this.state.overProductStockAmountLimitID.length)
            checkProductStockAmount.splice(0, checkProductStockAmount.length)

            items.map((row) => {
                this.props.productcart.filter((x) => x.UserCartID === row.product.UserCartID).map((items) => {
                    if (row.product.ProductStock < items.ProductQuantity) {
                        checkProductStockAmount.push(row.product.ProductID)
                        checkName.push(row.product.ProductName)
                    }
                    if (checkProductStockAmount.length > 0) {
                        this.setState({ ProductStockAmountlimit: true, overProductStockAmountLimitID: checkProductStockAmount })
                        overProductStockAmountlimit = true
                    }
                    else {
                        ProductIDs.push(row.product.ProductID);
                        ProductQuantity.push(row.quantity);
                    }
                })

            });


            if (overProductStockAmountlimit !== true && this.state.selectedProductDetailList.length > 0) {
                this.setState({ isDataAccepted: true })
            }

            if (this.state.selectedProductDetailList.length === 0) {
                toast.error("Please select at least 1 product to proceed")
            }
            if (overProductStockAmountlimit === true) {
                checkName.map((x) => {
                    toast.error(x + " has over current available stock")
                })
            }
        }
        else {
            // browserHistory.push("/login");
            window.location.reload(false);
        }
    };

    // ---------------------------------------------------- Check Selected ------------------------------------

    handleSelectedProduct(item, index) {
        if (this.state.selectedProductDetailList.length > 0) {
            let found = false
            this.state.selectedProductDetailList.map((x, i) => {
                if (x.id === item.id) {
                    this.state.selectedProductDetailList.splice(i, 1)
                    found = true
                }
            })
            if (found === false) {
                this.state.selectedProductDetailList.push(item)
            }
        }
        else {
            this.state.selectedProductDetailList.push(item)
        }
        this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    handleAllProductSellect(shopName, selectedProductListing) {
        const { cart, selectedProductDetailList } = this.state

        let itemsWithShopname = selectedProductDetailList.filter(x => x.MerchantShopName === shopName)
        let tempList = []

        if (itemsWithShopname.length > 0) {
            tempList = selectedProductDetailList.filter(x => x.MerchantShopName !== shopName)
        }
        else {
            itemsWithShopname = cart.filter(x => x.MerchantShopName === shopName)
            tempList = [...selectedProductDetailList, ...itemsWithShopname]
        }
        this.setState({ selectedProductDetailList: tempList, subtotal: tempList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    renderItems(displayCart) {
        return displayCart.map((item, i) => {
            let image;

            image = (
                <div className="product-image">
                    <img className="product-image__img" src={displayCart.Image} alt=""/>
                    {/* <Link to={url.product(item.product)} className="product-image__body">
                        <img className="product-image__img" src={item.product.ProductImage !== null && item.product.ProductImage !== undefined && item.product.ProductImage.length > 0 ? item.product.ProductImage : Logo} alt="Emporia" onError={(e) => { e.target.onerror = null; e.target.src = Logo }} />
                    </Link> */}
                </div>
            );

            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--checkbox">
                        {
                            this.props.history !== undefined &&
                            <Checkbox
                                checked={
                                    this.state.selectedProductDetailList.length > 0 ?
                                        this.state.selectedProductDetailList.filter(x => x.id === item.id).length > 0 ?
                                            true : false
                                        : false
                                }
                                onClick={() => this.handleSelectedProduct(item, i)}
                            />
                        }
                    </td>
                    <td className="cart-table__column cart-table__column--image">
                        {image}
                    </td>
                    <td className="cart-table__column cart-table__column--product">
                        <div style={{ fontSize: "14px" }}>
                            {/* <Link to={url.product(item.product)} className="cart-table__product-name">
                                {item.product.ProductName}
                            </Link> */}
                            {/* {
                                this.state.overProductStockAmountLimitID.length > 0 &&
                                this.state.overProductStockAmountLimitID.filter(x => x === item.product.ProductID).length > 0 &&
                                this.state.overProductStockAmountLimitID.filter(x => x === item.product.ProductID).map((x) => {
                                    return (
                                        <label className='mt-3' style={{ color: "red" }}> Over Stock Limit,  Available Stock: {item.product.ProductStock !== null ? item.product.ProductStock : "0"} </label>
                                    )
                                })
                            } */}
                        </div>
                        <div style={{ fontSize: "11px" }}>
                            {/* Variation: {item.product.ProductVariationValue} */}
                        </div>
                    </td>

                    <td className="cart-table__column cart-table__column--price" data-title="Price">
                        {/* <Currency value={item.product.ProductPrice !== null ? item.product.ProductPrice : 0} currency={"RM"} /> */}
                    </td>

                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                        {/* {
                            this.props.history !== undefined ?
                                <InputNumber
                                    onChange={(quantity) => this.handleChangeQuantity(item, quantity)}
                                    value={this.getItemQuantity(item)}
                                    min={1}
                                /> :
                                <label> {this.getItemQuantity(item)} </label>
                        } */}

                    </td>
                    {/* <td className="cart-table__column cart-table__column--total" data-title="Total">
                        <Currency value={item.product.ProductPrice * item.product.ProductQuantity} currency={"RM"} />
                    </td> */}

                    {/* <td className="cart-table__column cart-table__column--remove">
                        {
                            this.props.history !== undefined &&
                            <Button onClick={() => this.removeItem(item.product)} className={'btn btn-light btn-sm btn-svg-icon'} >
                                <Cross12Svg />
                            </Button>
                        }
                    </td> */}
                </tr>
            );
        });
    }

    renderCart() {

      const steps = this.getSteps();

        return(
            <Box sx={{padding:"10px",backgroundColor:"white",minwidth: '100vh'}} >
            <Paper style={{padding:'15px',backgroundColor:"transparent"}} elevation={0}>
                <Grid container 
                      alignItems="center"
                      justify="center"
                      style={{padding:'15px'}}
                >
                <Grid item xs={12} sm={12}>
               
      <Stepper activeStep={this.state.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

                </Grid>

               {this.state.activeStep === 0 &&  
               <>
                <Grid item xs={12} sm={12} style={{marginBottom:'20px'}}>
                    <Typography variant="h6" style={{fontWeight:"bold"}}>Sarawak Tourism E-Commerce</Typography>
                </Grid>
                <Grid item xs={12} sm={12} style={{marginBottom:'20px'}}>
                    <TableContainer>
                    <Table >
                        <TableRow>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell >Purchase</TableCell>
                            <TableCell >Purchase Info</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Total</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                       
                        <TableBody>
                        {this.state.data.map((row) => (
                            <TableRow
                            key={row.name}
                            >
                            <TableCell><Checkbox checked/></TableCell>
                            <TableCell><img src={row.Image} alt="" width="100px"/></TableCell>
                            <TableCell>
                                <div><Typography variant="h6">{row.ProductName}</Typography></div>
                                {row.Desc !== "null" &&
                                <div><Typography variant="caption">{row.Desc}</Typography></div>
                                }

                                {row.Duration !== "" &&
                                    <div><Typography variant="caption">{row.Duration}</Typography></div>
                                }
                                
                                </TableCell>
                            <TableCell><Typography variant="h6">{row.Quantity}</Typography></TableCell>
                            <TableCell><Typography variant="h6">RM {row.Total}</Typography></TableCell>
                            <TableCell>
                                <IconButton
                                    // onClick={()=this.deleteProductCart()}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Grid>

                    <Grid item xs={12} sm={12} justify="right" alignItems="right">
                        <Stack direction="row" spacing={2} style={{justifyContent:'right'}}>
                            <Typography variant="h6" style={{fontWeight:'bold', textAlign:'right'}}>Subtotal</Typography>
                            <Typography variant="h6" style={{textAlign:"right"}}>RM { this.state.data.reduce((sum, i) => (
                                sum += i.Total
                                ), 0)}</Typography>
                        </Stack>
                        
                    </Grid>
                    </>
    }

    {this.state.activeStep === 1 &&

    <Grid item xs={12} sm={12}>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={4} >
          <Paper style={{padding:'10px',minHeight:'200px', backgroundColor:this.state.address === 1 ? '#FFCD71' : 'transparent'}} elevation={2}>
          {this.state.address === 1 &&
                <Typography variant="caption" style={{fontWeight:"bold"}}>Selected</Typography>
            }
              <Typography variant='h6' style={{margin:"auto", textAlign:'center', paddingTop:"20px"}}>Self Pickup</Typography>
              {this.state.address !==1 &&
              <div style={{display:"flex", justifyContent:"center", paddingTop:"20px"}}>
                    <Button variant="contained" color="primary" onClick={()=>this.setState({address:1})}>Select</Button>
              </div>
                }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Paper style={{padding:'10px',minHeight:'200px', backgroundColor:this.state.address === 2 ? '#FFCD71' : 'transparent'}}
          elevation={2}>
              <div>
            {this.state.address ===2 &&
                <Typography variant="caption" style={{fontWeight:"bold"}}>Selected</Typography>
            }
              <Typography variant='h6' style={{margin:"auto", textAlign:'center', paddingTop:"20px"}}>Lot 123, Jalan Mutiara, 94300, Kota Samarahan, Sarawak</Typography>
              </div>

              {this.state.address !== 2 &&
              <div style={{display:"flex", justifyContent:"center", paddingTop:"20px"}}>
                    <Button variant="contained" color="primary" onClick={()=>this.setState({address:2})}>Select</Button>
              </div>
                }
              
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} >
        <Paper style={{padding:'10px',minHeight:'200px'}} elevation={2}>
             <div style={{display:'flex', justifyContent:'center', paddingTop:"50px"}}>
               <IconButton onClick={this.handleClickOpen}>
                  <AddCircleOutlineIcon fontSize='large'/>
               </IconButton>
             </div>
          </Paper>
        </Grid>

       
            {/* <HandleAddress
                  isOpen={this.state.open}
                  // handleOpen={this.handleAddNewCard}
                  // handleAddCreditCard={this.handleAddCreditCard}
                  handleClose={this.handleClose}
                  handleSaveAddress={this.handleClose}
                  // handleSaveAddress={this.handleAddress}
                  // handleChange={this.handleInputChange}
                  // handleCountryChange={this.selectCountry}
                  // addressState={this.state}
                  countryList={this.props.countries}
                  address={this.state.isAddAddress === false ? this.state.selectedAddresstoEdit : []}
                /> */}

      </Grid>
    </Grid>
    
    }
                  
                </Grid>

                <Grid container 
                      alignItems="right"
                      justify="right"
                      style={{padding:'15px'}}
                >
                   
                      <Grid item xs={12} sm={6} style={{margin:'auto', paddingTop:'15px'}}>
                        <div style={{display:'flex', justifyContent:'flex-start'}}>
                          <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            variant="contained"
                          >
                            Back
                          </Button>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} style={{margin:'auto', paddingTop:'15px'}}>
                      <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {this.state.activeStep === 2 ? 
                         <Button variant="contained" color="primary" onClick={this.props.history.push('/PurchaseSummary')}>
                         Submit
                        </Button>
                        :

                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                          Next
                       </Button>

                      }
                         
                      </div>
                      </Grid>
  
                </Grid>
                </Paper>
            </Box>
        )
    }

    render() {       

        let content;
        let continueshopping = (

            <Box sx={{ flexGrow: 1, margin:"20%", padding:"20px"}} 
            className="block block-empty"
            alignItems="center"
            justify="center">
            <Paper style={{padding:'15px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                      alignItems="center"
                      justify="center"

                >
                    <Grid item xs={12} sm={12}>
                        <Typography style={{textAlign:'center'}}>Your Shopping Cart is empty!</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button variant="contained" color="primary"> Continue Shopping </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
            </Box>
            // <div className="block block-empty" >
            //     {/* <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} /> */}
            //     <div className="container">
            //         <div className="block-empty__body">
            //             <div className="block-empty__message">Your shopping cart is empty!</div>
            //             <div className="block-empty__actions">
            //                 <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
        if (this.state.data.length) {
            if (this.state.isDataAccepted === true) {
                return (
                    <ShopPageCheckOut
                        data={this.state.data}
                        merchant={this.state.selectedProductDetailList.filter((ele, ind) => ind === this.state.selectedProductDetailList.findIndex(elem => elem.MerchantShopName === ele.MerchantShopName))}
                    />
                )
            } else {
                if (this.state.data.length > 0 && this.state.data.ReturnVal !== '0') {
                    content = this.renderCart();
                } else {
                    content = continueshopping;
                }
            }
        } else {
            content = continueshopping;
        }

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    productcart: state.counterReducer.productcart

});

const mapDispatchToProps = (dispatch) => {
    return {
        CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
        CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckOut);