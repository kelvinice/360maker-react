import React, {createRef, useCallback, useEffect} from 'react';
import {Viewer} from "photo-sphere-viewer";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";
import {GyroscopePlugin} from "photo-sphere-viewer/dist/plugins/gyroscope";
import {Global} from "../data/Global";
import {Marker, Scene} from "../models/DataModel";
import {v4 as uuidv4} from "uuid";
import {useAtom} from "jotai";
import {dataScenesAtom, mouseStateAtom, settingsAtom} from "../atoms/DataAtom";
import {useAtomCallback} from "jotai/utils";
import {useMenu} from "../providers/MenuProvider";
import toast from 'react-hot-toast';
import {MouseState} from "../constants/MouseState";
import {MarkerType} from "../constants/MarkerType";
import MarkerIconByType from "../utility/MarkerIconByType";
import Swal from "sweetalert2";
import {getURLParameter} from "../utility/Utility";

const PhotoSphereViewer = () => {
    const ref = createRef<HTMLDivElement>();
    const [scenes, setScenes] = useAtom(dataScenesAtom);
    const [setting] = useAtom(settingsAtom);
    const {setMarkerToConfig, setVideoToView, setImageToView} = useMenu();

    const deleteMarker = useAtomCallback(useCallback((get, set, marker: Marker) => {
        const scenes = get(dataScenesAtom);
        const currentScene = scenes?.find(scene => scene.id === Global.currentScene.id);
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
        if(scenes)
            set(dataScenesAtom, [...scenes]);
        toast.success("Marker deleted");
    }, []));

    const addMarker = useAtomCallback(useCallback((get, set, marker: Marker) => {
        const scenes = get(dataScenesAtom);
        if(!scenes)
            return;
        const currentScene = scenes.find(scene => scene.id === Global.currentScene.id);
        if(!currentScene){
            toast.error("Scene not found");
            return;
        }
        currentScene.markers.push(marker);
        set(dataScenesAtom, [...scenes]);
        toast.success("Marker added");
    }, []));

    const getScenes = useAtomCallback(useCallback((get) => {
        return get(dataScenesAtom);
    }, []));

    const getCurrentScene = async (targetSceneId: string) => {
        const scenes = await getScenes();
        if(!scenes)
            return;
        return scenes.find(scene => scene.id === targetSceneId);
    };

    const getMarker = useAtomCallback(useCallback(async (get, set, markerId: string) => {
        const currentScene = await getCurrentScene(Global.currentScene.id as string);
        if(!currentScene){
            toast.error("Scene not found");
            return;
        }
        return await currentScene.markers.find(marker => marker.id === markerId);
    }, []));


    useEffect(()=>{
        if(!ref || !ref.current || Global.viewer)
            return;

        Global.viewer = new Viewer({
            container: ref.current,
            plugins: [
                [MarkersPlugin, {
                    markers: [],
                }],
                [GyroscopePlugin, {
                    touchmove: true,
                    moveMode: 'smooth',
                }]
            ],
            mousemove: true,
        })

        const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
        // @ts-ignore
        markersPlugin.on('select-marker', (e, marker) => {
            const mouseState = getMouseState();
            if(mouseState === MouseState.Cursor){
                getMarker(marker.id).then(marker => {
                    if(!marker) return;
                    if(marker.type === MarkerType.PLACE){
                        getCurrentScene(
                            marker.targetSceneId as string
                        ).then(scene => {
                            if(!scene){
                                toast.error("Scene not found");
                                return;
                            }
                            changeScene(scene);
                        });
                    }else if(marker.type === MarkerType.VIDEO){
                        setVideoToView(marker.mediaPath as string);
                    }else if (marker.type === MarkerType.IMAGE){
                        setImageToView(marker.mediaPath as string);
                    }else if (marker.type === MarkerType.DESCRIPTION){
                        Swal.fire({
                            title: marker.tooltip ? marker.tooltip : "Information",
                            text: marker.description as string,
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
                    }

                });
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
                if(markersPlugin)
                    markersPlugin.removeMarker(marker.id);
            }
        });

        Global.viewer.on('click', (e, data) => {
            if (!data.rightclick && Global.currentScene) {
                const mouseState = getMouseState();
                let type: string|null = null;

                switch (mouseState) {
                    case MouseState.MarkerPlace:
                        type = MarkerType.PLACE;
                        break;
                    case MouseState.MarkerVideo:
                        type = MarkerType.VIDEO;
                        break;
                    case MouseState.MarkerImage:
                        type = MarkerType.IMAGE;
                        break;
                    case MouseState.MarkerDescription:
                        type = MarkerType.DESCRIPTION;
                        break;
                    case MouseState.MarkerLink:
                        type = MarkerType.LINK;
                        break;
                }

                if(type){
                    const newMarker: Marker = {
                        id: uuidv4(),
                        name: "New marker",
                        type: type,
                        location: {
                            longitude: data.longitude,
                            latitude: data.latitude
                        }
                    };
                    addMarker(newMarker);
                    //check if marker already exists
                    const marker = Global.currentScene.markers.find((m) => m.id === newMarker.id);

                    if (!marker) {
                        Global.currentScene.markers.push(newMarker);
                    }

                    if(markersPlugin)
                        markersPlugin.addMarker({
                            id: newMarker.id as string,
                            longitude: data.longitude,
                            latitude: data.latitude,
                            image: MarkerIconByType(type),
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
            }
        });

    }, [ref]);

    useEffect(() => {
        if(!Global.firstLoad)
            return;
        if(!setting || !scenes)
            return;

        const paramScene = getURLParameter("scene");
        let currentScene: Scene|undefined;
        if(paramScene && paramScene !== 'undefined'){
            currentScene = scenes.find(scene => scene.id === paramScene);
        }
        if(!currentScene){
            currentScene = scenes.find(scene => scene.id === setting.initialScene);
        }
        if(currentScene){
            changeScene(currentScene);
        }
        Global.firstLoad = false;
    }, [setting])


    const saveScene = useAtomCallback(useCallback((get) => {
        const scenes = get(dataScenesAtom);
        if(!scenes)
            return;
        setScenes([...scenes]);
    }, []))

    const getMouseState = useAtomCallback(useCallback((get) => {
        return get(mouseStateAtom);
    }, []));


    return (
        <div id="viewer" ref={ref} />
    )
};

const initMarkerOnScene = (scene: Scene) => {
    const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
    if(!markersPlugin)
        return;
    scene.markers.forEach(m => {
        markersPlugin.addMarker({
            id: m.id as string,
            longitude: m.location.longitude,
            latitude: m.location.latitude,
            image: MarkerIconByType(m.type),
            width: 32,
            height: 32,
            anchor: 'bottom center',
            tooltip: m.tooltip || m.name,
            data: {
                generated: false,
                scene: scene,
                marker: m
            }
        });
    });
}

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
            initMarkerOnScene(scene);

            const gyroPlugin = Global.viewer.getPlugin(GyroscopePlugin);
            try{
                gyroPlugin && gyroPlugin?.start();
            }catch (e){
                console.log(e);
            }
        });
    }else{
        initMarkerOnScene(scene);
    }
    Global.currentScene = scene;
}

export default PhotoSphereViewer;
