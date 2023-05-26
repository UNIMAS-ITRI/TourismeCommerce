import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';
import OrangUlu from '../../assets/OrangUlu.jpg'

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const INITIAL_STATE = {
    indexImageHover: "",
    dummyCardData: [
        { type: 'Accommodation', productName: 'Hilton Kuching', subtitle: '', ratingStar: 4, rating: '4', description: "Hilton Hotels & Resorts is a global brand of full-service hotels and resorts and the flagship brand of American multinational hospitality company Hilton. The original company was founded by Conrad Hilton", price: 179, imgURL: "https://pix10.agoda.net/hotelImages/10435/0/e7f5cfdb5f7c89bc1ec2c2cdd5631c37.jpg?ca=7&ce=1&s=1024x768" },
        { type: 'Accommodation', productName: 'Pullman Kuching', subtitle: '', ratingStar: 4, rating: '4', description: "Pullman Kuching is centrally located in the Kuching Golden Triangle, enjoying pride of place on Jalan Mathies hill, with panoramic city and river views.", price: 219, imgURL: "https://akdi.net/wp-content/uploads/2014/12/bExterior-night.jpg" },
        { type: 'Accommodation', productName: 'Grand Margherita Hotel', subtitle: '', ratingStar: 4, rating: '4', description: "Grand Margherita Hotel is located in the heart of Kuching's shopping and financial district and just 20 minutes drive from the Kuching International Airport.", price: 169, imgURL: "https://pix10.agoda.net/hotelImages/44583/-1/8742bb65e5a6b3f370d3e94212bb8a76.jpg?ca=23&ce=0&s=1024x768" },
        { type: 'Accommodation', productName: 'Imperial Hotel', subtitle: '', ratingStar: 4, rating: '4', description: "Imperial Hotel Kuching is a 4-star business class hotel which sits on top of the Boulevard Shopping Mall and adjoins the Imperial Suites.", price: 229, imgURL: "https://imperial.com.my/img/hotel-home.png" },
        { type: 'Accommodation', productName: 'Merdeka Palace Hotel', subtitle: '', ratingStar: 4, rating: '4', description: "Merdeka Palace Hotel & Suites combines the finest comfort with great hospitality and service, offering guests affordable luxury.", price: 239, imgURL: "https://ik.imgkit.net/3vlqs5axxjf/external/http://images.ntmllc.com/v4/Hotel/R35/R35022/R35022_EXT_ZBB8E7.JPG?tr=w-1200%2Cfo-auto" },
        { type: 'Accommodation', productName: 'Roxy Hotel', subtitle: '', ratingStar: 4, rating: '4', description: "Roxy Sematan is a relaxing modern hotel, set between Sematan peaceful town and the silence of Telok Melano village.", price: 164, imgURL: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/75/81/eb/facade.jpg?w=700&h=-1&s=1" },
        { type: 'Restaurants', productName: 'King Laksa Restaurant', subtitle: 'Sarawak Laksa Special', ratingStar: 4, rating: '4', description: "Famous foods: King Laksa Special, King Laksa Ambal, Dabai Fried Rice", price: 9, imgURL: "https://fastly.4sqi.net/img/general/600x600/24718637_c0dBfmXzBo6TLjZpzT7_t9iGqAqNiirwyaKeP5WSNbU.jpg" },
        { type: 'Restaurants', productName: 'Haji Salleh', subtitle: 'Kolok Mee', ratingStar: 4, rating: '4', description: "Famous foods: Mee Kolok", price: 4, imgURL: "https://cdn-ak.f.st-hatena.com/images/fotolife/m/malaysia_cinta78/20220829/20220829191603.jpg" },
        { type: 'Restaurants', productName: 'RJ Restaurant', subtitle: 'Mee Jawa Satay', ratingStar: 4, rating: '4', description: "Famous foods: Mee Jawa Satay, RJ Ayam Penyet", price: 9, imgURL: "https://lh5.googleusercontent.com/p/AF1QipOMT5ka5v1Kiyu6kKbi9NV-xXT_E2qcv-hHXF-Q=w1080-k-no" },
        { type: 'Restaurants', productName: 'Mira Kek House', subtitle: 'Kek Lapis Mira', ratingStar: 4, rating: '4', description: "Famous foods: Kek Lapis Traditional", price: 15, imgURL: "https://miracakehouse.com/new/wp-content/uploads/2020/08/miracakecentralmatang.jpg" },
        { type: 'Restaurants', productName: 'Warong Nusantara', subtitle: 'Peppercorn Beef Rice', ratingStar: 4, rating: '4', description: "Famous foods: Peppercorn Beef Rice", price: 10, imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/07/e6/e9/4f/warong-nusantara.jpg" },
        { type: 'Restaurants', productName: 'Ceylonese Kuching', subtitle: 'Naan Cheese', ratingStar: 5, rating: '5', description: "Famous foods: Banana Leaf Briyani Rice, Naan Cheese, Banana Cheese, Kopi Tarik", price: 16, imgURL: "https://fastly.4sqi.net/img/general/600x600/62276801_V8OOZxpn6Qlt4ndMffA17KWdE3PIU2ZvWHUqDBinsxY.jpg" },
        { type: 'Tourpackage', productName: 'Sarawak Sunset River Cruise', subtitle: 'Bestway Tour & Travel SDN BHD', ratingStar: 4, rating: '4', description: "Experience the signature sunset cruise with your family and loves one. Enjoy a breathtaking 360° panoramic view of Kuching skyline.", price: 156, imgURL: "https://images.t2u.io/upload/event/listing/0-27132-AWSS387d1b913-b3d9-4394-b422-ab03a9a2a611-Mfmb.jpg" },
        { type: 'Tourpackage', productName: 'Ukom Longhouse', subtitle: 'CPH Travel Agencies', ratingStar: 5, rating: '5', description: "Once infamously known as the Land of the Headhunters, a trip to Borneo will be incomplete without a visit to the homes of these once fearsome tribal warriors who remain as heroes in protecting their land which they highly safeguard for ancestral rights.", price: 560, imgURL: "https://www.startravel.com.my/wp-content/uploads/2023/05/ed4d849e-03ec-4a35-a9fe-397c719f2b50-scaled.jpg" },
        { type: 'Tourpackage', productName: 'Bako National Park', subtitle: 'Cat City Holidays SDN BHD', ratingStar: 5, rating: '5', description: "Bako National Park is a national park in Kuching District, Kuching Division, Sarawak, Malaysia. Established in 1957, it is the oldest national park in Sarawak. It covers an area of 27.27 square kilometres at the tip of the Muara Tebas peninsula at the mouth of the Bako and Kuching Rivers.", price: 352, imgURL: "https://i0.wp.com/borneoadventure.com/v3/wp-content/uploads/2012/01/STB-bako-sea-stack-01.jpg?fit=2000%2C1333&quality=60&strip=all&ssl=1" },
        { type: 'Tourpackage', productName: 'Gunung Gading Raflessia Tour', subtitle: 'Cat City Holidays SDN BHD', ratingStar: 5, rating: '5', description: "The Gunung Gading National Park is a national park in Lundu District, Kuching Division, Sarawak, Malaysia. The park is located roughly two hours drive from Kuching, and is a popular destination for seeing the Rafflesia flower in bloom.", price: 133, imgURL: "https://www.sarawaktourism.com/TourismApi/images/place/426/426_slider1.jpg" },
        { type: 'Tourpackage', productName: 'Mulu National Park', subtitle: 'Paradesa Borneo', ratingStar: 5, rating: '5', description: "The Gunung Mulu National Park is a national park in Miri Division, Sarawak, Malaysia. It is a UNESCO World Heritage Site that encompasses caves and karst formations in a mountainous equatorial rainforest settin.", price: 159, imgURL: "https://blog.qelola.com/wp-content/uploads/2020/06/gunung-mulu-national-park.jpg" },
        { type: 'Ticketing', productName: 'Brooke Gallery', subtitle: 'Sarawak Museum', ratingStar: 5, rating: '5', description: "The Brooke Gallery is a museum dedicated to the story of Sarawak's White Rajahs which once ruled Sarawak.", price: 15, imgURL: "https://56hotel.com.my/wp-content/uploads/2017/08/Fort-Margherita.jpg" },
        { type: 'Ticketing', productName: 'Textile Museum', subtitle: 'SarawakTour SDN BHD', ratingStar: 5, rating: '5', description: "The museum displays the textiles made by local communities in Sarawak, as well as traditional costumes and accessories. It also showcases the stages of textile manufacturing processes.", price: "FOC", imgURL: "https://live.staticflickr.com/8456/7903406596_b90ba0b346_b.jpg" },
        { type: 'Ticketing', productName: 'Adult (3 days Pass)', subtitle: 'Sarawak Cultural Village', ratingStar: 5, rating: '5', description: "The Rainforest World Music Festival (often abbreviated as RWMF) is an annual three-day music festival celebrating the diversity of world music, held in Kuching, Sarawak, Malaysia, with daytime music workshops, cultural displays, craft displays, food stalls, and main-stage evening concerts.", price: 345, imgURL: "https://scontent-kut2-2.xx.fbcdn.net/v/t39.30808-6/340076149_552984940150405_2294230660054685995_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeHDYKD4tJzRZOdfP91MpY4XSlv0LJysofFKW_QsnKyh8VO6nh_skvhZ7KZnh60U9AMwKl2mZJ0GwODRYa-VcIsm&_nc_ohc=XvlLRTXv-PMAX_bjFto&_nc_ht=scontent-kut2-2.xx&oh=00_AfDlY5DznyMt3TF_1DEPhjWJoMjR0lqNDLqEEwMD3TNr4w&oe=64731A17" },
        { type: 'Ticketing', productName: 'Adult (1 days Pass)', subtitle: 'Sarawak Cultural Village', ratingStar: 5, rating: '5', description: "The Rainforest World Music Festival (often abbreviated as RWMF) is an annual three-day music festival celebrating the diversity of world music, held in Kuching, Sarawak, Malaysia, with daytime music workshops, cultural displays, craft displays, food stalls, and main-stage evening concerts.", price: 140, imgURL: "https://scontent-kut2-2.xx.fbcdn.net/v/t39.30808-6/340076149_552984940150405_2294230660054685995_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeHDYKD4tJzRZOdfP91MpY4XSlv0LJysofFKW_QsnKyh8VO6nh_skvhZ7KZnh60U9AMwKl2mZJ0GwODRYa-VcIsm&_nc_ohc=XvlLRTXv-PMAX_bjFto&_nc_ht=scontent-kut2-2.xx&oh=00_AfDlY5DznyMt3TF_1DEPhjWJoMjR0lqNDLqEEwMD3TNr4w&oe=64731A17" },
        { type: 'Ticketing', productName: 'Family (3 days Pass)', subtitle: 'Sarawak Cultural Village', ratingStar: 5, rating: '5', description: "The Rainforest World Music Festival (often abbreviated as RWMF) is an annual three-day music festival celebrating the diversity of world music, held in Kuching, Sarawak, Malaysia, with daytime music workshops, cultural displays, craft displays, food stalls, and main-stage evening concerts.", price: 1020, imgURL: "https://scontent-kut2-2.xx.fbcdn.net/v/t39.30808-6/340076149_552984940150405_2294230660054685995_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeHDYKD4tJzRZOdfP91MpY4XSlv0LJysofFKW_QsnKyh8VO6nh_skvhZ7KZnh60U9AMwKl2mZJ0GwODRYa-VcIsm&_nc_ohc=XvlLRTXv-PMAX_bjFto&_nc_ht=scontent-kut2-2.xx&oh=00_AfDlY5DznyMt3TF_1DEPhjWJoMjR0lqNDLqEEwMD3TNr4w&oe=64731A17" },
        { type: 'Product', productName: 'Orang Ulu Multi Purpose Accessory', subtitle: 'LL Handcraft (aka Glass Coaster)', ratingStar: 5, rating: '5', description: "", price: 120, imgURL: OrangUlu },
        { type: 'Product', productName: 'Tango Budak', subtitle: 'LNB Handcraft', ratingStar: 5, rating: '5', description: "", price: 399, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKNlZchapOzvSDaSvYUAB2VHJ6q7rg6Ww9OkqnmRfkPwtBy5cJWL3Z7YZM6w-i6yT55nQ&usqp=CAU" },
        { type: 'Product', productName: 'Ceramic Necklace (Mint)', subtitle: 'Mka Craft', ratingStar: 5, rating: '5', description: "", price: 99, imgURL: "https://sarawakhandicraft.com.my/wp-content/uploads/2019/10/IMG_20191026_0922421.jpg" },
        { type: 'Product', productName: 'Bracelet (Unisex)', subtitle: 'Julia Jayne', ratingStar: 5, rating: '5', description: "", price: 60, imgURL: "https://ae01.alicdn.com/kf/S6e8520772ef6467fb77dfb1743f919b9c/Lucky-Charm-Tibetan-Buddhism-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Rope-Budda-Thread-Braided-Bracelet.jpg_Q90.jpg_.webp" },
        { type: 'Product', productName: 'Bidayuh Traditional (Fullset of 7)', subtitle: 'Paradesa Borneo', ratingStar: 5, rating: '5', description: "", price: 539, imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh6BSbFX8zfQWetwikZP6mf0tbPrXW1oILqRm8vFODwigu66zUGwKjSAYbae5F0lzLXGk&usqp=CAU" },
        { type: 'Transportation', productName: 'Bako National Park Jetty', subtitle: '-', ratingStar: 5, rating: '5', description: "", price: 129, imgURL: "https://3.bp.blogspot.com/-OKH3E4X276I/UuwWxkWS3II/AAAAAAAAJDc/iXU54aCrX8s/s1600/IMG_2982.JPG" },
        { type: 'Transportation', productName: 'Hydrogen Bus Kuching', subtitle: 'Minister of Transportation', ratingStar: 5, rating: '5', description: "", price: 1, imgURL: "https://www.intelligenttransport.com/wp-content/uploads/Hydrogen-bus-750x450-v2.jpg" },
        { type: 'Transportation', productName: 'Bindass Taxi Kuching Meter', subtitle: 'Taxi Kuching Services', ratingStar: 5, rating: '5', description: "", price: 12, imgURL: "https://kuchingtaxi.com/flashimage/j.jpg" },
        { type: 'Transportation', productName: 'Airasia (KL- KCH)', subtitle: 'Bestway Tour & Travel SDN BHD', ratingStar: 5, rating: '5', description: "", price: 129, imgURL: "https://i0.wp.com/airinsight.com/wp-content/uploads/2021/03/A321neo-AirAsia-scaled.jpg?fit=2560%2C1920&ssl=1" },
        { type: 'Transportation', productName: 'Malaysia Airline (KL- KCH)', subtitle: 'CPH Travel Agencies', ratingStar: 5, rating: '5', description: "", price: 299, imgURL: "https://theaureview.com/wp-content/uploads/2020/01/D-A350Generic-200718-e1553060211680.jpg" },
    ]
}

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { dummyCardData } = this.state;

        return (
            <div className="row">
                {
                    dummyCardData.filter((y) => y.type === this.props.type).map((x, index) => {
                        return (
                            <div class="CardView" className="col">
                                <Card sx={{ minHeight: 350, maxHeight: 450, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }}
                                // onClick={() => window.open(x.url, "_blank")}  
                                >
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={x.imgURL}
                                        alt={x.productName}
                                        style={{ opacity: this.state.indexImageHover === index ? "50%" : "100%", }}
                                        onMouseOver={() => this.setState({ indexImageHover: index })}
                                        onMouseOut={() => this.setState({ indexImageHover: "" })}
                                    />
                                    <CardContent>
                                        <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", }} >
                                            {x.productName}
                                        </Typography>
                                        <Typography color="text" variant="body2" fontWeight="700" >
                                            {x.subtitle}
                                        </Typography>
                                        <div className="row">
                                            <div className="col-4">
                                                <Rating
                                                    style={{ fontSize: "1.0rem" }}
                                                    value={x.ratingStar}
                                                />{" "}
                                            </div>
                                            <div className="col-8">
                                                <Typography variant="body2">{x.rating} ratings</Typography>
                                            </div>
                                        </div>
                                        <div className="col-12" style={{ height: "5.5vw", lineHeight: 1, overflowY: "auto" }}>
                                            <Typography variant="caption">{x.description} </Typography>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                                                    RM {x.price}
                                                </Typography>
                                            </div>
                                            <div className="col-6" style={{ display: "flex", justifyContent: "end" }}>
                                                <Button size="small" style={{ backgroundColor: "#8fb136", color: "white", width: "5.5vw" }} >
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);