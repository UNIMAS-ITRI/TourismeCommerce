import React, { useEffect } from "react";
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";

import  MarkersPlugin  from "photo-sphere-viewer/dist/plugins/markers";
import EmailIcon from '@mui/icons-material/Email';
import appleApp from '../assets/appleApp.png';
// import PhotoSphereViewer from "photo-sphere-viewer"
// import "./styles.css";


function Photo(props) {
  const sphereElementRef = React.createRef();
  const { src } = props;

  useEffect(() => {
    const shperePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: src,
      plugins: [ 
        [MarkersPlugin, {
          
            // image marker that opens the panel when clicked
            id: 'image',
            longitude: 0,
            latitude: 0.25,
            image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
            width: 32,
            height: 32,
            anchor: 'bottom center',
            tooltip: 'A image marker. <b>Click me!</b>',
            // content: document.getElementById('lorem-content').innerHTML
        }
      ]
      ]
    });

    const markersPlugin = shperePlayerInstance.getPlugin(MarkersPlugin);
    console.log("markersPlugin",shperePlayerInstance)
    console.log("Viewer", Viewer)
    console.log("markersPlugin",markersPlugin)

markersPlugin.on('select-marker', (e, marker) => {

  console.log("eee", e)
  console.log("eee", marker)
  markersPlugin.updateMarker({
    id: marker.id,
    image: appleApp
  });
});

    // unmount component instructions
    return () => {
      shperePlayerInstance.destroy();
    };
  }, [src, sphereElementRef]); // will only be called when the src prop gets updated

  return <div className="photosphere" ref={sphereElementRef} />;
}



export default function PanoramaViewer(props) {
  return (
        <div className='row' style={{ height: "30vw" }}>
            <Photo src={props.src} />
        </div>
  );
}




// import React, { useEffect } from 'react';
// // import PhotoSphereViewer  from 'photo-sphere-viewer';
// // import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
// import EmailIcon from '@mui/icons-material/Email';
// import appleApp from '../assets/appleApp.png';

// // import  {Viewer}  from "photo-sphere-viewer";
// // import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
// // import "photo-sphere-viewer/dist/plugins/markers.css";

// // import { GyroscopePlugin } from "photo-sphere-viewer/dist/plugins/gyroscope";

// // import { VisibleRangePlugin } from "photo-sphere-viewer/dist/plugins/visible-range";
// // import StereoPlugin from "photo-sphere-viewer/dist/plugins/stereo";

// // import MarkerIcon from "../images/photo-sphere-viewer/info.svg"


// function Photo(props) {
//     const sphereElementRef = React.createRef();
//     const { src } = props;

//     // useEffect(() => {
//     //     const shperePlayerInstance = new Viewer ({
//     //         container: sphereElementRef.current,
//     //         panorama: src,
//     //         // Plugin: [
//     //         //     // {
//     //         //     //     // image marker that opens the panel when clicked
//     //         //     //     id: 'image',
//     //         //     //     longitude: 0.2,
//     //         //     //     latitude: -0.13770,
//     //         //     //     image: appleApp,
//     //         //     //     width: 32,
//     //         //     //     height: 32,
//     //         //     //     anchor: 'bottom center',
//     //         //     //     tooltip: 'A image marker. <b>Click me!</b>',
//     //         //     //     content: "<p>ABCDHDHSGDHSAGHDGSHADGSHAGH</p>"
//     //         //     // },
//     //         //     {
//     //         //         // html marker with custom style
//     //         //         id: 'text',
//     //         //         longitude: 0,
//     //         //         latitude: 0,
//     //         //         html: 'HTML <b>marker</b> &hearts;',
//     //         //         anchor: 'bottom right',
//     //         //         scale: [0.5, 1.5],
//     //         //         style: {
//     //         //             maxWidth: '100px',
//     //         //             color: 'white',
//     //         //             fontSize: '20px',
//     //         //             fontFamily: 'Helvetica, sans-serif',
//     //         //             textAlign: 'center'
//     //         //         },
//     //         //         tooltip: {
//     //         //             content: 'An HTML marker',
//     //         //             position: 'right'
//     //         //         }
//     //         //     }
//     //         // ]

//     //         // plugins: [
//     //         //     // [
//     //         //     //     VisibleRangePlugin,
//     //         //     //     {
//     //         //     //         longitudeRange: [null],
//     //         //     //         latitudeRange: [-Math.PI / 2, Math.PI / 4], //Restrict range so you can't see the top of the pano
//     //         //     //     },
//     //         //     // ],
//     //         //     // [GyroscopePlugin, StereoPlugin],
//     //         //     [
//     //         //         MarkersPlugin,
//     //         //         {
//     //         //             markers: [
//     //         //                 {
//     //         //                     // id: "image",
//     //         //                     longitude: 0,
//     //         //                     latitude: 0.25,
//     //         //                     image: <EmailIcon />,
//     //         //                     width: 32,
//     //         //                     height: 32,
//     //         //                     anchor: "bottom center",
//     //         //                     tooltip: "A image marker.",
//     //         //                 },
//     //         //             ],
//     //         //         },
//     //         //     ],
//     //         // ]
//     //     });


//     //     // const markersPlugin = shperePlayerInstance.getPlugin(MarkersPlugin);

//     //     // markersPlugin.on('select-marker', (e, marker) => {
//     //     //     markersPlugin.updateMarker({
//     //     //         id: marker.id,
//     //     //         image: 'assets/pin-blue.png'
//     //     //     });
//     //     // });

        
//     //     // const markersPlugin = shperePlayerInstance.getPlugin(MarkersPlugin);

//     //     // markersPlugin.on("select-marker", (e, marker) => {
//     //     //     console.log("marker", marker)
//     //     //     console.log("marker", e)
//     //     // //   markersPlugin.updateMarker({
//     //     // //     id: marker.id,
//     //     // //   });
//     //     // });


//     //     // unmount component instructions
//     //     return () => {
//     //         shperePlayerInstance.destroy();
//     //     };
//     // }, [src, sphereElementRef]); // will only be called when the src prop gets updated

//     return <div className="photosphere" ref={sphereElementRef} />;
// }

// export default function PanoramaViewer(props) {
//     return (
//         <div className='row' style={{ height: "25vw" }}>

//             <Photo src={props.src} />
//         </div>

//     );
// }


