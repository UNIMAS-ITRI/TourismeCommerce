/** 
 * coordinate: {address, lat, lng}
 * zoom:{numeric}
 * showMarker:{bool}
 * width
 * height
 * apiKey
 * 
**/
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/Room';
import SendIcon from '@mui/icons-material/Send';


import IconButton from '@mui/material/IconButton';
import "./Map.css";
// import SearchBox from '../Map/SearchBox';

function MapModule(props) {
    let defaultLocation = props.coordinate ? { address: typeof props.coordinate.address !== "undefined" && props.coordinate.address != null ? props.coordinate.address : "Kuching", lat: Number(props.coordinate.lat), lng: Number(props.coordinate.lng) } : { address: "Kuching", lat: 1.5535, lng: 110.3593 }
    const [position, setPosition] = useState(defaultLocation);
    const [center, setCenter] = useState(defaultLocation)
    const [showMarker, setShowMarker] = useState(props.showMarker)
    const [isMapDraggable, setIsMapDraggable] = useState(false)
    const [mapsApiLoaded, setMapsApiLoaded] = useState(false);
    const [mapInstance, setMapInstance] = useState(null)
    const [mapsapi, setMapsapi] = useState(null)

    useEffect(() => {
        if (center != defaultLocation) {
            setCenter(defaultLocation)
            setShowMarker(props.showMarker)
            setPosition(defaultLocation)
        }
    }, [props])

    const LocationPin = ({ text }) => (
        <div className="pin">
            <LocationOnIcon />
            <p className="marker-label">{text}</p>
        </div>
    )

    const onMapClick = (e) => {
        setIsMapDraggable(false)
        setPosition({ address: typeof defaultLocation.address !== "undefined" && defaultLocation.address != null ? defaultLocation.address : 'New Coordinate', lat: e.lat, lng: e.lng })
        setShowMarker(true)
        props.setMapCoordinate({ lat: e.lat, lng: e.lng })
    }

    const onCircleInteraction = (childKey, childProps, mouse) => {
        setIsMapDraggable(false)
        if (typeof mouse.lat !== "undefined" && typeof mouse.lng !== "undefined") {
            setPosition({ address: typeof defaultLocation.address !== "undefined" && defaultLocation.address != null ? defaultLocation.address : "New Coordinate", lat: mouse.lat, lng: mouse.lng })
            props.setMapCoordinate({ lat: mouse.lat, lng: mouse.lng })
        }
    }

    const onLeaveCircleInteraction = (childKey, childProps, mouse) => {
        setIsMapDraggable(true)
        setCenter({ lat: mouse.lat, lng: mouse.lng })
    }

    const apiLoaded = (map, maps) => {
        setMapsApiLoaded(true)
        setMapInstance(maps)
        setMapsapi(maps)
    }

    const onChange = ({ center }) => { return }
    return (
        <div style={{ height: props.height ? props.height : 286, width: props.width ? props.width : "100%" }}>
            {/* {
                (mapsapi !== null) ? <SearchBox map={mapInstance} mapsapi={mapsapi} /> : ""
            } */}
            <div style={{ height: props.height, width: '100%' }}>
                <GoogleMapReact
                    height="250"
                    onChange={onChange}
                    bootstrapURLKeys={{
                        key: props.apiKey ? props.apiKey : 'AIzaSyAB-FVfqNk6PLVy2iuQUImtI55A5UaSfic',
                        libraries: ['places'],
                    }}
                    defaultCenter={position}
                    center={center}
                    defaultZoom={props.zoom ? props.zoom : 14}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => { apiLoaded(map, maps); }}
                    onClick={onMapClick}
                    draggable={isMapDraggable}
                    onChildMouseMove={onCircleInteraction}
                    onChildMouseDown={onCircleInteraction}
                    onChildMouseUp={onLeaveCircleInteraction}
                >
                    {
                        showMarker &&
                        <LocationPin
                            lat={defaultLocation.lat}
                            lng={defaultLocation.lng}
                            text={position.address}
                        />
                    }
                </GoogleMapReact>
                <div className="MapButton">
                    <IconButton style={{ borderRadius: "5px", padding: "20px", backgroundColor: "#95b43c" }} onClick={() => window.open("http://www.google.com/maps/place/" + defaultLocation.lat + "," + defaultLocation.lng, "_blank")}>
                        <label style={{ color: "white", paddingRight: "10px" }}>Get Direction</label><SendIcon style={{ fill: "white" }} />
                    </IconButton>
                </div>

            </div>
        </div >
    );

}

export default MapModule;