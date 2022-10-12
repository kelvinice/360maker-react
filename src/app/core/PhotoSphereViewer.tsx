import React, {createRef, useEffect} from 'react';
import {Viewer} from "photo-sphere-viewer";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";
import {Global} from "../data/Global";



const PhotoSphereViewer = () => {
    const ref = createRef<HTMLDivElement>();

    useEffect(()=>{
        if(!ref || !ref.current || Global.viewer)
            return;

        const viewer = new Viewer({
            panorama: "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg",
            container: ref.current,
            plugins: [
                [MarkersPlugin, {
                    markers: [],
                }],
            ]
        })
        Global.viewer = viewer;
        const markersPlugin = viewer.getPlugin(MarkersPlugin);
        // @ts-ignore
        markersPlugin.on('select-marker', (e, marker) => {
            // @ts-ignore
            // markersPlugin.updateMarker({
            //     id: marker.id,
            //     image: 'asset/pin-blue.png'
            // });
            console.log(Global.viewer);
            Global.viewer.setPanorama("asset/field.jpg");
        });

        viewer.on('click', (e, data) => {
            if (!data.rightclick) {
                // @ts-ignore
                markersPlugin.addMarker({
                    id: '#' + Math.random(),
                    longitude: data.longitude,
                    latitude: data.latitude,
                    image: 'asset/pin-blue.png',
                    width: 32,
                    height: 32,
                    anchor: 'bottom center',
                    tooltip: 'Generated pin',
                    data: {
                        generated: true
                    }
                });
            }
        });

    }, [ref]);


    return (
        <div id="viewer" ref={ref} />
    )
};

export default PhotoSphereViewer;