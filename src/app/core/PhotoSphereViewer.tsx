import React, {createRef, useCallback, useEffect} from 'react';
import {Viewer} from "photo-sphere-viewer";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";
import {Global} from "../data/Global";
import {Marker, Scene} from "../models/DataModel";
import {v4 as uuidv4} from "uuid";
import {useAtom} from "jotai";
import {dataScenesAtom, mouseStateAtom, settingsAtom} from "../atoms/DataAtom";
import {useAtomCallback} from "jotai/utils";
import {useMenu} from "../providers/MenuProvider";
import toast from 'react-hot-toast';
import {MouseState} from "../constants/MouseState";
import {PlaceMarkerIconPath} from "../constants/AssetPath";

const PhotoSphereViewer = () => {
    const ref = createRef<HTMLDivElement>();
    const [scenes, setScenes] = useAtom(dataScenesAtom);
    const [setting] = useAtom(settingsAtom);
    const {setMarkerToConfig} = useMenu();

    const deleteMarker = useAtomCallback(useCallback((get, set, marker: Marker) => {
        const scenes = get(dataScenesAtom);
        const currentScene = scenes.find(scene => scene.id === Global.currentScene.id);
        if(!currentScene){
            toast.error("Scene not found");
            return;
        }
        const index = currentScene.markers.findIndex(m => m.id === marker.id);
        if(index === -1){
            toast.error("Marker not found");
            return;
        }
        currentScene.markers.splice(index, 1);
        set(dataScenesAtom, [...scenes]);
        toast.success("Marker deleted");
    }, []));

    const addMarker = useAtomCallback(useCallback((get, set, marker: Marker) => {
        const scenes = get(dataScenesAtom);
        const currentScene = scenes.find(scene => scene.id === Global.currentScene.id);
        if(!currentScene){
            toast.error("Scene not found");
            return;
        }
        currentScene.markers.push(marker);
        set(dataScenesAtom, [...scenes]);
        toast.success("Marker added");
    }, []));

    useEffect(()=>{
        if(!ref || !ref.current || Global.viewer)
            return;

        Global.viewer = new Viewer({
            // panorama: "https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg",
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
            const mouseState = getMouseState();
            if(mouseState === MouseState.Cursor){
                const scene = scenes.find(scene => scene.id === marker.config.data.marker.targetSceneId);
                if(scene){
                    changeScene(scene);
                }
            }else if(mouseState === MouseState.Setting){
                const targetMarker = Global.currentScene.markers.find((m) => m.id === marker.data.marker.id);
                if(!targetMarker){
                    toast.error("Marker not found");
                    return;
                }
                setMarkerToConfig(targetMarker);
            }else if(mouseState === MouseState.Delete){
                const targetMarker = Global.currentScene.markers.find((m) => m.id === marker.data.marker.id);
                if(!targetMarker){
                    toast.error("Marker not found");
                    return;
                }
                deleteMarker(targetMarker);
                Global.currentScene.markers = Global.currentScene.markers.filter((m) => m.id !== marker.data.marker.id);
                // @ts-ignore
                markersPlugin.removeMarker(marker);
            }
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

                addMarker(newMarker);
                //check if marker already exists
                const marker = Global.currentScene.markers.find((m) => m.location.longitude === data.longitude && m.location.latitude === data.latitude);
                if(!marker){
                    Global.currentScene.markers.push(newMarker);
                }

                // @ts-ignore
                markersPlugin.addMarker({
                    id: newMarker.id as string,
                    longitude: data.longitude,
                    latitude: data.latitude,
                    image: PlaceMarkerIconPath,
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

    useEffect(() => {
        if(!Global.firstLoad)
            return;
        if(!setting)
            return;
        const currentScene = scenes.find(scene => scene.id === setting.initialScene);
        if(currentScene){
            changeScene(currentScene);
        }
        Global.firstLoad = false;
    }, [setting])


    const saveScene = useAtomCallback(useCallback((get) => {
        const scenes = get(dataScenesAtom);
        setScenes([...scenes]);
    }, []))

    const getMouseState = useAtomCallback(useCallback((get) => {
        return get(mouseStateAtom);
    }, []));


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
    if(!Global.currentScene){
        Global.currentScene = scene;
        Global.viewer.once('ready', () => {
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
        });
    }else{
        console.log(scene);
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
    Global.currentScene = scene;
}

export default PhotoSphereViewer;
