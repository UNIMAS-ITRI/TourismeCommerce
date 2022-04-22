import React, { Component, useEffect, createRef, useState } from 'react';
import PhotoSphereViewer from "photo-sphere-viewer"
// import "photo-sphere-viewer/dist/photo-sphere-viewer.min.css"
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MarkerIcon from "../../images/photo-sphere-viewer/info.svg"
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { Viewer } from "photo-sphere-viewer";

function mapStateToProps(state) {
    return {
        panoHotspot: state.counterReducer["panoHotspot"],
        panoHotspotReturn: state.counterReducer["panoHotspotReturn"],
    };
}
function mapDispatchToProps(dispatch) {
    return {
        ViewPanoHotspotById: (propsData) => dispatch(GitAction.ViewPanoHotspotById(propsData)),
        UpdatePanoHotspots: (propsData) => dispatch(GitAction.UpdatePanoHotspots(propsData)),
        AddPanoHotspots: (propsData) => dispatch(GitAction.AddPanoHotspots(propsData)),
        ResetHotspotsReturnValue: () => dispatch(GitAction.ResetHotspotsReturnValue()),
        DeletePanoHotspots: (propsData) => dispatch(GitAction.DeletePanoHotspots(propsData)),
    };
}

function PSVContainer(props) {
    const sphereElementRef = React.createRef();
    const { src, panoramaInformation, panoHotspots, size } = props;
    const [markers, setMarkers] = useState([])
    const [newHotspot, setNewHotspot] = useState({ mId: "", longitude: "", latitude: "", description: "", })
    const [editingHotspot, setEditingHotspot] = useState({ mId: "", hotspotId: "", description: "", })
    const [psvPlugin, setPsvPlugin] = useState(null)
    const [isAddModalToggle, setisAddModalToggle] = useState(false)
    const [isEditModalToggle, setisEditModalToggle] = useState(false)
    const [isDeleteModalToggle, setIsDeleteModalToggle] = useState(false)

    // const OnSubmitAddHotspot = (e) => {
    //     e.preventDefault()
    //     if (newHotspot.description === "")
    //         alert("Please enter a description")
    //     else {
    //         props.PanoProps.AddPanoHotspots({
    //             mId: newHotspot.mId,
    //             pitch: newHotspot.longitude,
    //             yaw: newHotspot.latitude,
    //             description: newHotspot.description.trim()
    //         });
    //         props.PanoProps.ViewPanoHotspotById({ mId: newHotspot.mId })
    //         psvPlugin.clearMarkers();
    //         setNewHotspot({ mId: "", longitude: "", latitude: "", description: "", })
    //         setisAddModalToggle(false)
    //     }

    // }

    // const OnSubmitUpdateHotspot = (e) => {
    //     e.preventDefault()
    //     if (editingHotspot.description === "")
    //         alert("Description cannot be empty")
    //     else {
    //         props.PanoProps.UpdatePanoHotspots({
    //             hotspotId: editingHotspot.hotspotId,
    //             description: editingHotspot.description.trim()
    //         });
    //         props.PanoProps.ViewPanoHotspotById({ mId: editingHotspot.mId })
    //         psvPlugin.clearMarkers();
    //         setEditingHotspot({ hotspotId: "", description: "", })
    //         setisEditModalToggle(false)
    //     }

    // }

    // const OnSubmitDeleteMarker = () => {
    //     props.PanoProps.DeletePanoHotspots({ hotspotId: editingHotspot.hotspotId })
    //     props.PanoProps.ViewPanoHotspotById({ mId: editingHotspot.mId })
    //     setEditingHotspot({ hotspotId: "", description: "", })
    //     setIsDeleteModalToggle(false)
    //     setisEditModalToggle(false)
    //     psvPlugin.clearMarkers();
    // }

    // const deleteHotspot = () => {
    //     setIsDeleteModalToggle(true)
    // }

    // const cancelAddingMarker = () => {
    //     let list = markers;
    //     list.pop()
    //     setMarkers(list)
    //     psvPlugin.clearMarkers();

    //     // eslint-disable-next-line array-callback-return
    //     list.map((elem, index) => { psvPlugin.addMarker(elem) })
    //     setPsvPlugin(psvPlugin)
    //     setisAddModalToggle(false)
    // }

    function addingMarker(marker_list, object) {
        marker_list.push(object)
        setMarkers(marker_list)
    }

    useEffect(() => {
        let marker_list = []
        // eslint-disable-next-line array-callback-return
        panoHotspots !== undefined && panoHotspots.map((elem, index) => {
            let object = {
                id: 'hotspots_' + elem.hotspotId,
                hotspotId: elem.hotspotId,
                mId: elem.mId,
                longitude: elem.pitch,
                latitude: elem.yaw,
                image: MarkerIcon,
                width: 32,
                height: 32,
                anchor: 'bottom center',
                tooltip: elem.description,
                data: { generated: true },
                type: elem.type
            }
            marker_list.push(object)
        })

        console.log("aasasasa", src)

        const spherePlayerInstance = PhotoSphereViewer({
            container: sphereElementRef.current,
            panorama: src,
            //   caption: 'Pulau Pulau</b>',

            size: size,
            navbar: true,
            navbar_style: {
                backgroundColor: 'rgba(58, 67, 77, 0.7)'
            },
            markers: marker_list,
            time_anim: false,
            move_speed:0.1,


        });
        setPsvPlugin(spherePlayerInstance)
        // setMarkers(markers.concat(marker_list))

        spherePlayerInstance.on('click', function (e) {
            let object = {
                id: 'hotspots_' + Math.random(),
                longitude: e.longitude,
                latitude: e.latitude,
                image: MarkerIcon,
                width: 32,
                height: 32,
                anchor: 'bottom center',
                tooltip: '',
                data: { generated: true }
            }
            setNewHotspot({ mId: panoramaInformation.mId, longitude: object.longitude, latitude: object.latitude, description: newHotspot.description })
            spherePlayerInstance.addMarker(object);
            addingMarker(marker_list, object)
            setisAddModalToggle(true)
        });

        spherePlayerInstance.on('select-marker', function (marker) {
            if (marker.data && marker.data.generated) {
                setEditingHotspot({ mId: marker.mId, hotspotId: marker.hotspotId, description: marker.tooltip.content ? marker.tooltip.content : "" })
                setisEditModalToggle(true)
            }
        });

        return () => {
            try {
                spherePlayerInstance.destroy();
            }
            catch (e) { }
        };
    }, [props.panoHotspots]);


    return (
        <div>
            <div className="view-container mt-3" ref={sphereElementRef}></div>
            {/*Add*/}
            {/* <Dialog
                open={isAddModalToggle}
                onClose={() => {

                }}
                aria-labelledby="add-new-panorama-dialog"
                aria-describedby="add-new-panorama"
                fullWidth={true}
                maxWidth="sm"
            >
                <div align="center" className="form-content p-2">
                    <form onSubmit={OnSubmitAddHotspot} noValidate autoComplete="off">
                        <div style={{ textAlign: 'center' }}>
                            <FormGroup className="w-100">
                                <label htmlFor="markerDesc">Description</label>
                                <FormTextarea
                                    id="markerDesc"
                                    size="sm"
                                    placeholder=""
                                    autoFocus
                                    style={{ minHeight: 75 }}
                                    onChange={e => { setNewHotspot({ mId: newHotspot.mId, longitude: newHotspot.longitude, latitude: newHotspot.latitude, description: e.target.value }) }}
                                    value={newHotspot.description}
                                    required
                                />
                            </FormGroup>
                        </div>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                value="submit"
                                type="submit"
                                variant="outlined"
                                onClick={() => {

                                }}
                                style={{ margin: '10px' }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => { cancelAddingMarker() }}
                                color="primary"
                                style={{ margin: '10px' }}
                            >
                                Cancel
                            </Button>
                        </div> 
                    </form>
                </div>
            </Dialog> */}

            {/* <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
            /> */}

            {/* edit */}
            {/* <Dialog
                open={isEditModalToggle}
                onClose={() => setisEditModalToggle(false)}
                aria-labelledby="add-new-panorama-dialog"
                aria-describedby="add-new-panorama"
                fullWidth={true}
                maxWidth="sm"
            >
                <div align="center" className="form-content p-2">
                    <form onSubmit={OnSubmitUpdateHotspot} noValidate autoComplete="off">
                        <div style={{ textAlign: 'center' }}>
                            <FormGroup className="w-100">
                                <label htmlFor="markerDesc"> Edit Description</label>
                                <FormTextarea
                                    id="markerDesc"
                                    size="sm"
                                    placeholder=""
                                    autoFocus
                                    style={{ minHeight: 75 }}
                                    defaultValue={editingHotspot.description}
                                    onChange={e => setEditingHotspot({ mId: editingHotspot.mId, hotspotId: editingHotspot.hotspotId, description: e.target.value })}
                                    required
                                />
                            </FormGroup>
                        </div>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="outlined" type="button" onClick={() => { deleteHotspot() }} color="secondary" style={{ margin: '10px' }}>
                                Delete
                            </Button>
                            <Button variant="outlined" type="submit" onClick={() => { }} color="primary" style={{ margin: '10px' }}>Save</Button>
                            <Button variant="outlined" onClick={() => { navigator.clipboard.writeText(editingHotspot.description) }} style={{ margin: '10px' }}>
                                Copy
                            </Button>
                            <Button variant="outlined" onClick={() => setisEditModalToggle(false)} style={{ margin: '10px' }}>Cancel</Button>
                            <br />

                        </div>
                    </form>
                </div>
            </Dialog> */}

            {/* <Dialog
                open={isDeleteModalToggle}
                onClose={() => setIsDeleteModalToggle(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">{"Removing Marker"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove this marker?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteModalToggle(false)} > Cancel </Button>
                    <Button onClick={() => OnSubmitDeleteMarker()} color="secondary" autoFocus> Confirm Delete </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}

class PanoramaPhoto extends Component {
    constructor(props) {
        super(props);
        // this.sphereElementRef = createRef()
        this.state = {
            hotspotId: "",
            mId: "",
            pitch: "",
            yaw: "",
            type: "",
            description: "asd",
            edit: true,
            markers: [],

            isModalPopupToggle: false,
            modalPopupMode: "",
            selectedMarker: null,
        }

    }

    componentDidMount() {
        console.log(this.props.imageUrl)
        // if (typeof this.props.selectedImage.mId !== 'undefined') {
        //     this.props.ViewPanoHotspotById({ mId: this.props.selectedImage.mId })

        //     // eslint-disable-next-line no-unused-vars
        //     const timeout = setTimeout(function () { console.log() }, 1000)
        // }
    }


    render() {

        const selectedImage = {
            isFoodTrails: null,
            mId: 777,
            mediaDesc: "360 Image",
            mediaTitle: "Bako National Park",
            mediaType: "VR",
            mediaUrl: "188_360_photo01.jpg",
            placeId: 188,
            slideOrder: null,
            thumbnail: null,
            typeIcon: null,
        }
        const imageUrl = "https://tourism.denoo.my/TourismApi/images/place/188/360/188_360_photo01.jpg"

        const panoHotspot = [
            {
                CreateDate: null,
                CreatedBy: null,
                ModifiedBy: null,
                ModifiedDate: null,
                delInd: 0,
                description: "Despite its seemingly small size, Bako contains a wide range of vegetation – swamp forest, scrub-like padang vegetation, mangrove forest, dipterocarp forest, delicate cliff vegetation and more.",
                hotspotId: 497,
                mId: 777,
                pitch: -0.8,
                type: "info",
                yaw: -0.6
            }
        ]

        console.log("this.props", this.props)
        return (
            <div className='row' style={{ height: "25vw" }}>
                {
                    <PSVContainer
                        src={imageUrl}
                        panoramaInformation={selectedImage}
                        panoHotspots={panoHotspot !== undefined && panoHotspot.length > 0 ? panoHotspot : []}
                        size={{ height: "90vh", width: "100%" }}
                        PanoProps={this.props}
                    />
                }
            </div >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PanoramaPhoto);
