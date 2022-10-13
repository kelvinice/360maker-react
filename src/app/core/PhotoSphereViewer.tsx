import React, {createRef, useCallback, useEffect} from 'react';
import {Viewer} from "photo-sphere-viewer";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";
import {Global} from "../data/Global";
import {Marker, Scene} from "../models/DataModel";
import {v4 as uuidv4} from "uuid";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../atoms/DataAtom";
import {useAtomCallback} from "jotai/utils";

const PhotoSphereViewer = () => {
    const ref = createRef<HTMLDivElement>();
    const [scenes, setScenes] = useAtom(dataScenesAtom);

    useEffect(()=>{
        if(!ref || !ref.current || Global.viewer)
            return;

        Global.viewer = new Viewer({
            panorama: "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg",
            container: ref.current,
            plugins: [
                [MarkersPlugin, {
                    markers: [],
                }],
            ]
        })
        const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
        // @ts-ignore
        markersPlugin.on('select-marker', (e, marker) => {
            // @ts-ignore
            // markersPlugin.updateMarker({
            //     id: marker.id,
            //     image: 'asset/pin-blue.png'
            // });
            console.log(e);
            console.log(marker.data);


            // Global.viewer.setPanorama("asset/field.jpg");
        });

        Global.viewer.on('click', (e, data) => {
            if (!data.rightclick && Global.currentScene) {
                const newMarker: Marker = {
                    id: uuidv4(),
                    name: "New marker",
                    type: "scene",
                    location: {
                        longitude: data.longitude,
                        latitude: data.latitude
                    }
                };
                Global.currentScene.markers.push(newMarker);

                // @ts-ignore
                markersPlugin.addMarker({
                    id: newMarker.id as string,
                    longitude: data.longitude,
                    latitude: data.latitude,
                    image: 'asset/pin-blue.png',
                    width: 32,
                    height: 32,
                    anchor: 'bottom center',
                    tooltip: newMarker.name,
                    data: {
                        generated: true,
                        scene: Global.currentScene,
                        marker: newMarker
                    }
                });

                saveScene();
            }
        });

    }, [ref]);

    const saveScene = useAtomCallback(useCallback((get) => {
        const scenes = get(dataScenesAtom);
        setScenes([...scenes]);
    }, []))




    return (
        <div id="viewer" ref={ref} />
    )
};

export const changeScene = (scene: Scene) => {
    Global.viewer.setPanorama(scene.path);

    const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
    if(!markersPlugin)
        return;
    if(Global.currentScene){
        const currentMarker = Global.currentScene.markers;
        const markerIds = currentMarker.map(m => m.id as string);
        markersPlugin.removeMarkers(markerIds);
    }
    Global.currentScene = scene;
    scene.markers.forEach(m => {
        markersPlugin.addMarker({
            id: m.id as string,
            longitude: m.location.longitude,
            latitude: m.location.latitude,
            image: 'asset/pin-blue.png',
            width: 32,
            height: 32,
            anchor: 'bottom center',
            tooltip: m.name,
            data: {
                generated: false,
                scene: scene,
                marker: m
            }
        });
    });

}

export default PhotoSphereViewer;
