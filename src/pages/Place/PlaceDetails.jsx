import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";

import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import PageHeader from "../../tools/breadcrumb/breadcrumb";

function mapStateToProps(state) {
    return {
        // foods: state.counterReducer["foods"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // CallTesting: () => dispatch(GitAction.CallTesting()),
    };
}


const INITIAL_STATE = {
    swiperImg: [
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider4.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider1.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider2.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider3.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider4.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider1.jpg" },
    ],

    breadcrumb: [
        { title: "Home", url: "./" },
        { title: "Attraction", url: "https://www.sarawak2discover.com/MainPlaceOfInterest.aspx" },
        { title: "Old Kuching Heritage Building and Monuments", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=15" },
        { title: "Brooke Memorial", url: "" }
    ]
}

class PlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {

        const PlaceDetails = [
            {
                name: "Brooke Memorial",
                State: "Kuching",
                Email: "-",
                Website: "Website",
                Contact: "-",
                OperateTime: "Open 24-hours",
                Rating: 5,
                Review: [
                    { Name: "UAT Tester", Rating: 5, Review: "Nice Place" },
                    { Name: "riantysaimon19", Rating: 5, Review: "Beautiful" },
                    { Name: "Cccddd83", Rating: 5, Review: "wow" },
                ],
                latitude: 1.559935000000000,
                longitude: 110.345102000000000,
                PlaceDesc: "As its name suggests, the Brooke Memorial was put up in honour of Rajah Charles Brooke, the second White Rajah of Sarawak for his services and dedication to the state. Commissioned in 1924, this memorial monument consists of a 6 metre granite obelisk with a bas relief of the Rajah in marble. There are also bronze panels on the four corners of the memorial, representing the Sarawakian community: Dayak, Kayan, Malay and Chinese."
            }
        ]

        const Gallery = [
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery1.jpg", description: "First page of the monument showing the endorsement towards Rajah Charles Brooke." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery2.jpg", description: "Brooke Memorial with the Old Kuching Courthouse." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery3.jpg", description: "Brooke Memorial with the other famous attractions, such as The Square Tower and Darul Hana Bridge." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery4.jpg", description: "Brooke Memorial during daytime." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery5.jpg", description: "Brooke Memorial during nightime." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery6.jpg", description: "Kenyah Tribe’s hero." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery7.jpg", description: "Chinese Tribe’s hero." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery8.jpg", description: "Penan Tribe’s hero" },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery9.jpg", description: "Malay Tribe’s hero." },
            { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/gallery10.jpg", description: "Portrait sculpture of Charles Brooke – Rajah Sarawak." }
        ]

        const Video = [{ url: "https://www.sarawak2discover.com/TourismApi/images/place/487/media/Brooke_Memorial.mp4" }]
        
        const Pano=[
            {url:"https://www.sarawak2discover.com/TourismAPI/images/place/487/360/487_360_photo01.jpg"},
            {url:"https://www.sarawak2discover.com/TourismAPI/images/place/487/360/487_360_photo02.jpg"},
            {url:"https://www.sarawak2discover.com/TourismAPI/images/place/487/360/487_360_photo03.jpg"},
            {url:"https://www.sarawak2discover.com/TourismAPI/images/place/487/360/487_360_photo04.jpg"}
        ]

        const recommend = [
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/493/493_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=493&plat=1.560269000000000&plng=110.345553000000000", name:"Square Tower"},
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/488/488_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=488&plat=1.559240000000000&plng=110.344550000000000", name:"The Japanese Building"},
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/2745/2745_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=2745&plat=1.559292000000000&plng=110.346161000000000", name:"Kuching Waterfront Lodge"},
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/74/74_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=74&plat=1.558715000000000&plng=110.344500000000000", name:"The Waterfront Hotel Kuching"},
            
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/496/496_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=496&plat=1.558591000000000&plng=110.344826000000000", name:"The Pavilion (Textile Museum)"},
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/10/10_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=10&plat=1.558551000000000&plng=110.345679000000000", name:"Mei Xin's Laksa, Lau Ya Keng Foodcourt"},
            {image:"https://www.sarawak2discover.com/TourismApi/images/place/179/179_slider1.jpg", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=179&plat=1.559484000000000&plng=110.346528000000000", name:"Kuching Waterfront"},
            {image:"https://www.sarawak2discover.com/images/main.png", url:"https://www.sarawak2discover.com/PlaceDetail.aspx?pid=3000&plat=1.559484000000000&plng=110.346528000000000", name:"Sarawak Regatta"}
        ]
        return (
            <div>
                <div style={{ float: "left", marginTop: "15px", marginLeft: "15px" , position:"relative"}} >
                    <PageHeader breadcrumb={this.state.breadcrumb} />
                </div>
                <Swiper
                    modules={[EffectFade, Pagination, Autoplay]}
                    effect="fade"
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    height={250}
                    width={300}  
                    autoplay={{ delay: 5000, }}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                >
                    {
                        this.state.swiperImg.map((el) => {
                            return <SwiperSlide zIndex={0}><img src={el.image} /></SwiperSlide>
                        })
                    }
                </Swiper>
                <div style={{ fontsize: "1.185vw", textAlign: "JUSTIFY", fontFamily: "Future Md BT", padding: "2.3vw" }}></div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);