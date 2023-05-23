// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { GitAction } from "../../../store/action/gitAction";

import ShopPageCheckOut from "./ShopPageCheckOut.js";

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

class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantities: [],
            ProductStockAmountlimit: false,
            overProductStockAmountLimitID: [],
            cart: [],
            subtotal: 0,
            setDetails: false,
            selectedIndex: "",

            MerchantShopName: [],

            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false,

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
            Image:"https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1024,h_682/w_63,x_11,y_11,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tj6dgyrajldfgzxtnq52/SarawakCulturalVillageHalfDayTourfromKuching.jpg",
            ProductName:"Sarawak Cultural Village",
            Desc:"Exploring the unique features of Sarawak.",
            Price: 60,
            Quantity: 1,
            Total: 60,},

        ],
        };
        this.setDetails = this.setDetails.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleSelectedProduct = this.handleSelectedProduct.bind(this)
        this.handleAllProductSellect = this.handleAllProductSellect.bind(this)
    }
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

    componentDidMount() {
        if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
            this.setDetails(this.props.productcart)
        }
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

    renderCart() {
        return(
            <Box sx={{padding:"10px",backgroundColor:"white",minwidth: '100vh'}} >
            <Paper style={{padding:'15px',backgroundColor:"transparent"}} elevation={0}>
                <Grid container 
                      alignItems="center"
                      justify="center"
                      style={{padding:'15px'}}
                >
                  
                <Grid item xs={12} sm={12} style={{marginBottom:'20px'}}>
                    <Typography variant="h6" style={{fontWeight:"bold"}}>Sarawak Tourism E-Commerce</Typography>
                </Grid>
                <Grid item xs={12} sm={12} style={{marginBottom:'20px'}}>
                    <TableContainer>
                    <Table >
                        <TableRow>
                            <TableCell><Checkbox/></TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Subtotal</TableCell>
                        </TableRow>
                       
                        <TableBody>
                        {this.state.data.map((row) => (
                            <TableRow
                            key={row.name}
                            >
                            <TableCell><Checkbox/></TableCell>
                            <TableCell>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <img src={row.Image} alt="" width="100px"/>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <div><Typography variant="h6">{row.ProductName}</Typography></div>
                                            {row.Desc !== "null" &&
                                                <div><Typography variant="caption">{row.Desc}</Typography></div>
                                            }

                                            {row.Duration !== "" &&
                                                <div><Typography variant="caption">{row.Duration}</Typography></div>
                                            }
                                    </Grid>
                                
                                </Grid>
                            </TableCell>
                            {/* <TableCell>
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
                            </TableCell> */}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Grid>
                  
                </Grid>

                <Grid container 
                      alignItems="right"
                      justify="right"
                      style={{padding:'15px'}}
                >
                    <Grid item xs={12} sm={12} justify="right" alignItems="right">
                        <Stack direction="row" spacing={2} style={{justifyContent:'right'}}>
                            <Typography variant="h6" style={{fontWeight:'bold', textAlign:'right'}}>Subtotal</Typography>
                            <Typography variant="h6" style={{textAlign:"right"}}>RM { this.state.data.reduce((sum, i) => (
      sum += i.Total
    ), 0)}</Typography>
                        </Stack>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} justify="right" alignItems="right" style={{marginTop:'10px'}}>
                        <div style={{display:"flex", justifyContent:"right"}}>
                            <Button variant='contained' color="primary" onClick={()=>window.location = "./ShopPageCheckOut/1"}>Checkout</Button>
                            {/* <Button variant='contained' color="primary" onClick={()=>window.location = url.producCheckOut(1)}>Checkout</Button> */}
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
    // productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => {
    return {
        // CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
        // CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);